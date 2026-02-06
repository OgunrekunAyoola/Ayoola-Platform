import { Router, Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment';
import Subscriber from '../models/Subscriber';

const router = Router();

// GET /api/posts - List published posts with pagination
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude content for list view for performance

    const total = await Post.countDocuments({ status: 'published' });

    res.json({
      data: posts,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/posts/:slug - Get single published post
router.get('/:slug', async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST /api/posts/:id/like - Increment like count
router.post('/:id/like', async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likeCount: 1 } },
      { new: true }
    );

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({ likeCount: post.likeCount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET /api/posts/:id/comments - List approved comments
router.get('/:id/comments', async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find({ 
      postId: req.params.id, 
      isApproved: true 
    }).sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST /api/posts/:id/comments - Create comment & capture subscriber
router.post('/:id/comments', async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorName, authorEmail, body } = req.body;

    if (!authorName || !authorEmail || !body) {
      res.status(400).json({ message: 'Name, email, and comment body are required' });
      return;
    }

    // 1. Create Comment
    const comment = new Comment({
      postId: req.params.id,
      authorName,
      authorEmail,
      body,
      isApproved: true, // Auto-approve by default
    });
    await comment.save();

    // 2. Increment commentCount on Post
    await Post.findByIdAndUpdate(req.params.id, { $inc: { commentCount: 1 } });

    // 3. Capture Subscriber (Upsert)
    await Subscriber.updateOne(
      { email: authorEmail },
      { 
        $setOnInsert: { email: authorEmail, source: 'comment' } 
      },
      { upsert: true }
    );

    res.status(201).json({ 
      message: 'Comment posted successfully', 
      comment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
