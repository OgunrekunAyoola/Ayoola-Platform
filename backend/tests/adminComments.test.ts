import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import Comment from "../src/models/Comment";
import Post from "../src/models/Post";
import jwt from "jsonwebtoken";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test_db";
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || "test_secret";

describe("Admin Comments API", () => {
  let adminToken: string;
  let postId: string;
  let commentId: string;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
    // Generate admin token
    adminToken = jwt.sign({ role: "admin" }, ADMIN_JWT_SECRET, {
      expiresIn: "1h",
    });
  }, 20000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Comment.deleteMany({});
    await Post.deleteMany({});

    // Create a dummy post
    const post = await Post.create({
      title: "Test Post",
      slug: "test-post",
      content: "Content",
      excerpt: "Excerpt",
      status: "published",
      publishedAt: new Date(),
    });
    postId = post._id.toString();

    // Create a dummy comment (auto-approved by default)
    const comment = await Comment.create({
      postId,
      authorName: "Test User",
      authorEmail: "test@example.com",
      body: "Test Comment",
      isApproved: true,
    });
    commentId = comment._id.toString();
  });

  it("should list all comments with isApproved field", async () => {
    const res = await request(app)
      .get("/api/admin/comments")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].isApproved).toBe(true);
    expect(res.body[0].body).toBe("Test Comment");
  });

  it("should filter pending comments", async () => {
    // Create a pending comment (manually set isApproved: false)
    await Comment.create({
      postId,
      authorName: "Pending User",
      authorEmail: "pending@example.com",
      body: "Pending Comment",
      isApproved: false,
    });

    const res = await request(app)
      .get("/api/admin/comments?pending=true")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].authorName).toBe("Pending User");
    expect(res.body[0].isApproved).toBe(false);
  });

  it("should approve a pending comment", async () => {
    // Create a pending comment
    const pendingComment = await Comment.create({
      postId,
      authorName: "To Approve",
      authorEmail: "approve@example.com",
      body: "Approve Me",
      isApproved: false,
    });

    const res = await request(app)
      .put(`/api/admin/comments/${pendingComment._id}/approve`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.isApproved).toBe(true);

    // Verify in DB
    const dbComment = await Comment.findById(pendingComment._id);
    expect(dbComment?.isApproved).toBe(true);
  });
});
