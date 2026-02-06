import request from "supertest";
import mongoose from "mongoose";
// We must mock resend BEFORE importing app
jest.mock("resend", () => {
  return {
    Resend: jest.fn(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({ id: "mock_email_id" }),
      },
    })),
  };
});

import { Resend } from "resend";
import app from "../src/app";
import Subscriber from "../src/models/Subscriber";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test_db_subscriber";

describe("Subscriber Flow Integration Tests", () => {
  let mockSend: jest.Mock;

  beforeAll(async () => {
    process.env.RESEND_API_KEY = "re_mock_key";
    process.env.ADMIN_EMAIL = "admin@example.com";

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const resendMock = Resend as unknown as jest.Mock;
    if (resendMock.mock.results.length > 0) {
      mockSend = resendMock.mock.results[0].value.emails.send;
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Subscriber.deleteMany({});
    if (mockSend) mockSend.mockClear();
  });

  it("should create a new subscriber and send welcome email + admin notification", async () => {
    const subscriberData = {
      email: "newuser@example.com",
      source: "newsletter_form",
    };

    const res = await request(app).post("/api/subscribers").send(subscriberData);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(subscriberData.email);

    // Verify DB
    const savedSubscriber = await Subscriber.findOne({ email: subscriberData.email });
    expect(savedSubscriber).toBeTruthy();

    // Verify Emails
    // Should be called twice: Welcome Email + Admin Notification
    expect(mockSend).toHaveBeenCalledTimes(2);

    // Check Welcome Email
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: subscriberData.email,
        subject: "Welcome to the circle",
      })
    );

    // Check Admin Notification
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: process.env.ADMIN_EMAIL,
        subject: `New Subscriber: ${subscriberData.email}`,
      })
    );
  });

  it("should NOT send welcome email for existing subscriber (upsert)", async () => {
    // 1. Create first time
    const subscriberData = {
      email: "existing@example.com",
      source: "newsletter_form",
    };
    
    // Insert directly into DB with old date to simulate existing user
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10); // 10 days ago

    await Subscriber.create({
      email: subscriberData.email,
      source: "old_source",
      createdAt: oldDate,
      updatedAt: oldDate
    });

    if (mockSend) mockSend.mockClear();

    // 2. Try to subscribe again
    const res = await request(app).post("/api/subscribers").send(subscriberData);

    expect(res.status).toBe(200);
    
    // DB should still have the old source (setDefaultsOnInsert doesn't overwrite if exists, and we used $setOnInsert)
    const savedSubscriber = await Subscriber.findOne({ email: subscriberData.email });
    expect(savedSubscriber?.source).toBe("old_source");

    // Should NOT send emails because it's not new
    expect(mockSend).not.toHaveBeenCalled();
  });
});
