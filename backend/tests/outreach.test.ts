import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import OutreachTarget from "../src/models/OutreachTarget";
import jwt from "jsonwebtoken";

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "test_secret";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test_db";

// Mock Admin Token
const adminToken = jwt.sign(
  { email: "admin@example.com", isAdmin: true },
  ADMIN_JWT_SECRET,
  { expiresIn: "1h" },
);

describe("Outreach API", () => {
  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
  }, 30000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await OutreachTarget.deleteMany({});
  }, 30000);

  it("should create a new outreach target", async () => {
    const res = await request(app)
      .post("/api/admin/outreach")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test User",
        email: "test@example.com",
        company: "Test Co",
        segment: "UK Service Businesses",
        notes: "Test notes",
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test User");
    expect(res.body.status).toBe("Pending");
  }, 30000);

  it("should list outreach targets", async () => {
    await OutreachTarget.create({
      name: "Existing User",
      email: "existing@example.com",
      company: "Existing Co",
      segment: "Other",
      status: "Pending",
    });

    const res = await request(app)
      .get("/api/admin/outreach")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Existing User");
  });

  it("should update an outreach target status", async () => {
    const target = await OutreachTarget.create({
      name: "Update User",
      email: "update@example.com",
      company: "Update Co",
      segment: "Other",
      status: "Pending",
    });

    const res = await request(app)
      .put(`/api/admin/outreach/${target._id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        status: "Sent",
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("Sent");
  });

  it("should delete an outreach target", async () => {
    const target = await OutreachTarget.create({
      name: "Delete User",
      email: "delete@example.com",
      company: "Delete Co",
      segment: "Other",
      status: "Pending",
    });

    const res = await request(app)
      .delete(`/api/admin/outreach/${target._id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Target deleted successfully");

    const check = await OutreachTarget.findById(target._id);
    expect(check).toBeNull();
  }, 30000);
});
