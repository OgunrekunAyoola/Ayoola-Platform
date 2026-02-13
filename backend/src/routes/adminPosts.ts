import express, { Response } from "express";
import Post from "../models/Post";
import { adminAuth, AdminRequest } from "../middleware/adminAuth";

const router = express.Router();

// Apply adminAuth to all routes
router.use(adminAuth);

// GET /api/admin/posts - List all posts
router.get("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
});

// GET /api/admin/posts/:id - Get single post
router.get("/:id", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
});

// POST /api/admin/posts - Create new post
router.post("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const postData = { ...req.body };
    // If publishing, ensure publishedAt is set
    if (postData.status === "published" && !postData.publishedAt) {
      postData.publishedAt = new Date();
    }

    const post = new Post(postData);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: "Error creating post", error });
  }
});

// PUT /api/admin/posts/:id - Update post
router.put("/:id", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    
    // If publishing, ensure publishedAt is set
    if (updates.status === "published" && !updates.publishedAt) {
      // Check if it was already published to avoid overwriting original publish date?
      // For now, if client sends empty publishedAt, we set it. 
      // Ideally client should send existing publishedAt if they don't want to change it.
      // But safe bet is: if it's not in DB, set it. 
      // Since we don't have the old doc here yet (unless we fetch first), 
      // we can use findByIdAndUpdate logic.
      // Actually, let's fetch first to be safe about publishedAt logic if needed, 
      // OR just set it if missing in update payload.
      // A simpler approach: if provided payload has status=published and NO publishedAt, set it.
      updates.publishedAt = new Date();
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true },
    );
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: "Error updating post", error });
  }
});

// DELETE /api/admin/posts/:id - Delete post
router.delete(
  "/:id",
  async (req: AdminRequest, res: Response): Promise<void> => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting post", error });
    }
  },
);

export default router;
