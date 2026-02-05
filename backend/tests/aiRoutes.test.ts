import request from "supertest";
import express from "express";
import aiRoutes from "../src/routes/aiRoutes";
import Post from "../src/models/Post";
import Project from "../src/models/Project";
import { generateText } from "../src/services/aiClient";

// Mock dependencies
jest.mock("../src/models/Post");
jest.mock("../src/models/Project");
jest.mock("../src/services/aiClient");

const app = express();
app.use(express.json());
app.use("/api/ai", aiRoutes);

describe("AI Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/ai/posts/:id/qa", () => {
    it("should return an answer for a valid question", async () => {
      const mockPost = {
        _id: "507f1f77bcf86cd799439011",
        title: "Test Post",
        content: "This is test content.",
        tags: ["test"],
        status: "published",
      };

      (Post.findById as jest.Mock).mockResolvedValue(mockPost);
      (generateText as jest.Mock).mockResolvedValue("This is the AI answer.");

      const res = await request(app)
        .post(`/api/ai/posts/${mockPost._id}/qa`)
        .send({ question: "What is this?" });

      expect(res.status).toBe(200);
      expect(res.body.answer).toBe("This is the AI answer.");
      expect(Post.findById).toHaveBeenCalledWith(mockPost._id);
      expect(generateText).toHaveBeenCalled();
    });

    it("should return 400 for invalid question", async () => {
      const res = await request(app)
        .post("/api/ai/posts/507f1f77bcf86cd799439011/qa")
        .send({ question: "Short" }); // Too short

      expect(res.status).toBe(400);
    });

    it("should return 404 if post not found", async () => {
      (Post.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app)
        .post("/api/ai/posts/507f1f77bcf86cd799439011/qa")
        .send({ question: "Valid question?" });

      expect(res.status).toBe(404);
    });
  });

  describe("POST /api/ai/reading-path", () => {
    it("should return a reading path", async () => {
      const mockPosts = [
        { _id: "1", title: "Post 1", tags: ["a"], excerpt: "e1" },
        { _id: "2", title: "Post 2", tags: ["b"], excerpt: "e2" },
        { _id: "3", title: "Post 3", tags: ["c"], excerpt: "e3" },
      ];
      
      // Mock Post.find().select().lean()
      const mockLean = jest.fn().mockResolvedValue(mockPosts);
      const mockSelect = jest.fn().mockReturnValue({ lean: mockLean });
      (Post.find as jest.Mock).mockReturnValue({ select: mockSelect });

      const mockAiResponse = JSON.stringify({
        intro: "Here is your path.",
        path: [
          { id: "1", why: "Reason 1" },
          { id: "2", why: "Reason 2" }
        ]
      });
      (generateText as jest.Mock).mockResolvedValue(mockAiResponse);

      const res = await request(app)
        .post("/api/ai/reading-path")
        .send({ goal: "I want to learn testing" });

      expect(res.status).toBe(200);
      expect(res.body.path).toHaveLength(2);
      expect(res.body.path[0].why).toBe("Reason 1");
    });
  });

  describe("POST /api/ai/projects/:id/persona-summary", () => {
    it("should return a summary for a valid persona", async () => {
      const mockProject = {
        _id: "507f1f77bcf86cd799439011",
        title: "Test Project",
        description: "Desc",
        techStack: ["Node"],
      };

      (Project.findById as jest.Mock).mockResolvedValue(mockProject);
      (generateText as jest.Mock).mockResolvedValue("Simplified summary.");

      const res = await request(app)
        .post(`/api/ai/projects/${mockProject._id}/persona-summary`)
        .send({ persona: "child" });

      expect(res.status).toBe(200);
      expect(res.body.summary).toBe("Simplified summary.");
    });
  });
});
