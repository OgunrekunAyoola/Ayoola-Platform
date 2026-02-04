import express, { Response } from "express";
import Project from "../models/Project";
import { adminAuth, AdminRequest } from "../middleware/adminAuth";

const router = express.Router();

// All routes here are protected
router.use(adminAuth);

// Get all projects
router.get("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
});

// Get single project
router.get("/:id", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project", error });
  }
});

// Create a new project
router.post("/", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error creating project", error });
  }
});

// Update an existing project
router.put("/:id", async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: "Error updating project", error });
  }
});

// Delete a project
router.delete(
  "/:id",
  async (req: AdminRequest, res: Response): Promise<void> => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting project", error });
    }
  },
);

export default router;
