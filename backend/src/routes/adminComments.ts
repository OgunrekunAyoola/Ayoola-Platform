import express, { Response } from "express";
import Comment from "../models/Comment";
import { adminAuth, AdminRequest } from "../middleware/adminAuth";

const router = express.Router();

router.use(adminAuth);

// Get all comments (or filter by query)
router.get("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    // If query param ?pending=true is present, filter by approved: false
    const filter: any = {};
    if (req.query.pending === "true") {
      filter.isApproved = false;
    }
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
});

// Approve a comment
router.put(
  "/:id/approve",
  async (req: AdminRequest, res: Response): Promise<void> => {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        { isApproved: true },
        { new: true },
      );
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.json(comment);
    } catch (error) {
      res.status(400).json({ message: "Error approving comment", error });
    }
  },
);

// Delete a comment
router.delete(
  "/:id",
  async (req: AdminRequest, res: Response): Promise<void> => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  },
);

export default router;
