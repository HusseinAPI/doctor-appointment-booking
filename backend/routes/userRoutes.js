import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import db from '../models/index.js';
const { User } = db;
import { generateToken, setTokenInCookie } from '../utils.js';

// SignIn

router.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    const isMatchPass = await bcrypt.compare(password, user.password);

    if (!isMatchPass) {
      return res.status(404).json({ message: 'Invalid Email or Password' });
    }

    const token = generateToken({
      name: user.name,
      email: user.email,
    });

    setTokenInCookie(res, token);

    const role = user.role;

    return res.status(200).json({ token, role });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// SignUp

router.post('/auth/signup', async (req, res) => {
  const { name, email, phone, dateOfBirth, password, role } = req.body;

  try {
    const existEmail = await User.findOne({ where: { email } });

    if (existEmail) {
      return res.status(404).json({ message: 'try another email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      dateOfBirth,
      password: hashedPassword,
      role,
    });

    const userInfo = await User.findOne({ where: { email } });

    const payload = { id: userInfo.id, email: userInfo.email };

    const token = generateToken(payload);

    setTokenInCookie(res, token);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
