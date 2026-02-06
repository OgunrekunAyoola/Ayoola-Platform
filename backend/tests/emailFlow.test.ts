import request from "supertest";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// We must mock resend BEFORE importing app, and we can't rely on outer variables in the factory.
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
import OutreachTarget from "../src/models/OutreachTarget";
import ContactMessage from "../src/models/ContactMessage";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test_db_email";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "test_secret";

describe("Email Flow Integration Tests", () => {
  let adminToken: string;
  let mockSend: jest.Mock;

  beforeAll(async () => {
    process.env.RESEND_API_KEY = "re_mock_key";

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
    adminToken = jwt.sign({ role: "admin" }, ADMIN_JWT_SECRET, {
      expiresIn: "1h",
    });

    // Retrieve the mockSend function from the Resend mock instance
    // emailService creates 'new Resend()', so the constructor mock should have been called.
    const resendMock = Resend as unknown as jest.Mock;
    if (resendMock.mock.results.length > 0) {
      mockSend = resendMock.mock.results[0].value.emails.send;
    } else {
      // Fallback if not initialized yet (unlikely if app imports emailService)
      // Or maybe emailService is lazy loaded? No, top level.
      console.warn("Resend constructor not called yet?");
      // We can re-assign it later if needed or check in beforeEach
    }
  }, 20000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await OutreachTarget.deleteMany({});
    await ContactMessage.deleteMany({});

    // Refresh mockSend reference just in case
    const resendMock = Resend as unknown as jest.Mock;
    if (resendMock.mock.results.length > 0) {
      mockSend = resendMock.mock.results[0].value.emails.send;
      mockSend.mockClear();
    }
  });

  describe("Contact Form Email", () => {
    it("should save contact message and send admin notification", async () => {
      const contactData = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, I need a website.",
        typeOfWork: "Web Development",
      };

      const res = await request(app).post("/api/contact").send(contactData);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe("Message received");

      const savedMsg = await ContactMessage.findOne({
        email: "john@example.com",
      });
      expect(savedMsg).toBeTruthy();
      expect(savedMsg?.message).toBe(contactData.message);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: `New Contact: ${contactData.name}`,
          html: expect.stringContaining(contactData.message),
        }),
      );
    });

    it("should validate required fields", async () => {
      const res = await request(app)
        .post("/api/contact")
        .send({ name: "Incomplete" });

      expect(res.status).toBe(400);
      expect(mockSend).not.toHaveBeenCalled();
    });
  });

  describe("Outreach Email", () => {
    it("should send email to target and update status", async () => {
      const target = await OutreachTarget.create({
        name: "Jane Smith",
        email: "jane@company.com",
        company: "Jane Co",
        segment: "UK Service Businesses",
        status: "Pending",
      });

      const emailData = {
        subject: "Collaboration Proposal",
        htmlContent: "<p>Hi Jane, let us work together.</p>",
      };

      const res = await request(app)
        .post(`/api/admin/outreach/${target._id}/send`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send(emailData);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Email sent successfully");
      expect(res.body.target.status).toBe("Sent");

      const updatedTarget = await OutreachTarget.findById(target._id);
      expect(updatedTarget?.status).toBe("Sent");
      expect(updatedTarget?.lastContactedAt).toBeTruthy();

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          to: target.email,
          subject: emailData.subject,
        }),
      );
    });

    it("should return 404 for non-existent target", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post(`/api/admin/outreach/${fakeId}/send`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ subject: "Hi", htmlContent: "Body" });

      expect(res.status).toBe(404);
      expect(mockSend).not.toHaveBeenCalled();
    });
  });
});
