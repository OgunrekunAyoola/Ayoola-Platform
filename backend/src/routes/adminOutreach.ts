import express, { Response } from "express";
import OutreachTarget from "../models/OutreachTarget";
import { adminAuth, AdminRequest } from "../middleware/adminAuth";

const router = express.Router();

// Apply adminAuth to all routes
router.use(adminAuth);

// GET /api/admin/outreach - List all targets
router.get("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const targets = await OutreachTarget.find().sort({ createdAt: -1 });
    res.json(targets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching outreach targets", error });
  }
});

// POST /api/admin/outreach - Create new target
router.post("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const newTarget = new OutreachTarget(req.body);
    const savedTarget = await newTarget.save();
    res.status(201).json(savedTarget);
  } catch (error) {
    res.status(400).json({ message: "Error creating outreach target", error });
  }
});

// PUT /api/admin/outreach/:id - Update target
router.put("/:id", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const updatedTarget = await OutreachTarget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTarget) {
      res.status(404).json({ message: "Target not found" });
      return;
    }
    res.json(updatedTarget);
  } catch (error) {
    res.status(400).json({ message: "Error updating outreach target", error });
  }
});

// DELETE /api/admin/outreach/:id - Delete target
router.delete("/:id", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const deletedTarget = await OutreachTarget.findByIdAndDelete(req.params.id);
    if (!deletedTarget) {
      res.status(404).json({ message: "Target not found" });
      return;
    }
    res.json({ message: "Target deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting outreach target", error });
  }
});

export default router;
