import { Router, Request, Response } from 'express';
import Project from '../models/Project';

const router = Router();

// GET /api/projects - List public projects
router.get('/', async (req: Request, res: Response) => {
  try {
    // Spec: list projects where visibility = 'public', sorted by createdAt desc
    // We can also allow filtering by featured if needed, but for now strict to spec.
    const projects = await Project.find({ visibility: 'public' })
      .sort({ createdAt: -1 })
      .select('-description'); // Exclude heavy description for list view

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/projects/:slug - Get single project
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }

    // Spec says: "return a single project by slug where visibility = 'public' or email_gated"
    // Since our findOne doesn't filter by visibility, we are good.
    // If we wanted to restrict to only public/gated (and not 'private' if that existed), we would add that query.
    // But schema only has 'public' | 'email_gated'. So all are accessible via this endpoint.

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
