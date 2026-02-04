import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { verifyPassword } from '../utils/password';

const router = express.Router();

// POST /api/admin/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 1. Check if email matches admin email
    if (!email || email !== config.ADMIN_EMAIL) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // 2. Verify password
    // If ADMIN_PASSWORD_HASH is not set, we can't login (security default)
    if (!config.ADMIN_PASSWORD_HASH) {
      console.error('ADMIN_PASSWORD_HASH is not set in environment variables');
      res.status(500).json({ message: 'Server configuration error' });
      return;
    }

    const isValid = await verifyPassword(password, config.ADMIN_PASSWORD_HASH);

    if (!isValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // 3. Generate JWT
    const token = jwt.sign(
      { sub: 'admin', email: config.ADMIN_EMAIL },
      config.ADMIN_JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
