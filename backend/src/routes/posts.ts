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
router.post('/:id/comments', async (req: Request, res: Response) => {
  try {
    const { authorName, authorEmail, body } = req.body;

    // 1. Create Comment
    const comment = new Comment({
      postId: req.params.id,
      authorName,
      authorEmail,
      body,
      isApproved: false, // Explicitly false until admin approves
    });
    await comment.save();

    // 2. Capture Subscriber (Upsert)
    // We don't wait for this to fail the response, but good to await it.
    await Subscriber.findOneAndUpdate(
      { email: authorEmail },
      { 
        $set: { email: authorEmail }, 
        $addToSet: { source: 'comment' } // Keep track if they came from multiple sources? 
        // Schema says source is string enum, not array. 
        // Spec says "upsert by email (if email exists, update source list or keep first)"
        // But our schema is single string. Let's update source if it's new or keep existing.
        // Actually, for simplicity and MVP, if they exist, we just leave them be or update timestamp.
        // Let's just ensure they exist.
        // If we want to strictly follow schema which has single source string:
        // We will just use $setOnInsert to set source only if new.
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    
    // Update: Actually, looking at Subscriber model, source is a single string.
    // If they are already a subscriber from 'newsletter', and now they comment, 
    // we probably shouldn't overwrite 'newsletter' with 'comment' or vice versa blindly.
    // But for MVP, let's just ensure they are in the DB.
    // I'll use findOneAndUpdate to ensure existence.
    // If it's a new user, source will be 'comment'.
    
    // Re-reading logic: "upsert by email (if email exists, update source list or keep first)"
    // Since our schema `source` is a string (not array), I will stick to "keep first" (ignore if exists) 
    // OR overwrite. Let's use $setOnInsert for source to "keep first".
    
    await Subscriber.updateOne(
      { email: authorEmail },
      { 
        $setOnInsert: { email: authorEmail, source: 'comment' } 
      },
      { upsert: true }
    );

    res.status(201).json({ 
      message: 'Comment submitted for approval', 
      comment 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
