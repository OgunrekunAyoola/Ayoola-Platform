import { Router, Request, Response } from 'express';
import ContactMessage from '../models/ContactMessage';

const router = Router();

// POST /api/contact - Submit contact form
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, message, typeOfWork } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: 'Name, email, and message are required' });
      return;
    }

    const contactMsg = new ContactMessage({
      name,
      email,
      message,
      typeOfWork,
    });

    await contactMsg.save();

    // Future: Send email notification to admin here (e.g. via Resend/SendGrid)

    res.status(201).json({ message: 'Message received', data: contactMsg });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
