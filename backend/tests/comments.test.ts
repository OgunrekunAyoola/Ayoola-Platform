import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app";
import Post from "../src/models/Post";
import Comment from "../src/models/Comment";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/test_db";

describe("Comments API (Auto-Approval)", () => {
  let postId: string;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }
  }, 10000);

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
  });

  it("should auto-approve a new comment", async () => {
    const res = await request(app)
      .post(`/api/posts/${postId}/comments`)
      .send({
        authorName: "Test User",
        authorEmail: "test@example.com",
        body: "This is a great post!",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Comment posted successfully");
    expect(res.body.comment.isApproved).toBe(true);
    expect(res.body.comment.body).toBe("This is a great post!");

    // Verify in DB
    const dbComment = await Comment.findById(res.body.comment._id);
    expect(dbComment).not.toBeNull();
    expect(dbComment?.isApproved).toBe(true);
  });

  it("should list the comment immediately after posting", async () => {
    // 1. Post a comment
    await request(app)
      .post(`/api/posts/${postId}/comments`)
      .send({
        authorName: "Immediate User",
        authorEmail: "immediate@example.com",
        body: "I should appear immediately.",
      });

    // 2. Fetch comments
    const res = await request(app).get(`/api/posts/${postId}/comments`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].authorName).toBe("Immediate User");
    expect(res.body[0].body).toBe("I should appear immediately.");
  });

  it("should reject invalid comments (missing fields)", async () => {
    const res = await request(app)
      .post(`/api/posts/${postId}/comments`)
      .send({
        authorName: "Incomplete User",
        // Missing email and body
      });

    expect(res.status).toBe(400);
  });
});
