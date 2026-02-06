import express from 'express';
import { config } from '../config/env';

const router = express.Router();

router.post('/resend', async (req, res) => {
  try {
    const payload = req.body;
    
    // Log the entire payload for debugging
    console.log('Received Resend Webhook:', JSON.stringify(payload, null, 2));

    // Basic event handling
    // Resend webhooks typically send an event object
    if (payload.type === 'email.received') {
      const emailData = payload.data;
      console.log(`Email received from: ${emailData.from} to: ${emailData.to} with subject: ${emailData.subject}`);
      // Future TODO: Store email in database or notify admin
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

export default router;
