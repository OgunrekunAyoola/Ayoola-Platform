import express, { Response } from 'express';
import Post from '../models/Post';
import Project from '../models/Project';
import Comment from '../models/Comment';
import { adminAuth, AdminRequest } from '../middleware/adminAuth';

const router = express.Router();

router.use(adminAuth);

router.get('/', async (req: AdminRequest, res: Response): Promise<void> => {
  try {
    const [postCount, projectCount, commentCount] = await Promise.all([
      Post.countDocuments(),
      Project.countDocuments(),
      Comment.countDocuments()
    ]);
    res.json({ postCount, projectCount, commentCount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error });
  }
});

export default router;
