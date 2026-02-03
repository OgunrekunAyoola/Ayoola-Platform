import { Router, Request, Response } from 'express';
import Subscriber from '../models/Subscriber';

const router = Router();

// POST /api/subscribers - Add/Update subscriber
router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, source } = req.body;

    if (!email || !source) {
      res.status(400).json({ message: 'Email and source are required' });
      return;
    }

    // Spec: "upsert by email (if email exists, update source list or keep first); return subscriber."
    // As discussed in posts.ts, our schema has a single source string.
    // We will use findOneAndUpdate with upsert. 
    // If exists, we won't overwrite the original source (to preserve where they first came from),
    // OR we could overwrite it. Spec says "update source list or keep first".
    // Since we don't have a list, "keep first" implies $setOnInsert.

    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { 
        $setOnInsert: { email, source } 
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(subscriber);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
