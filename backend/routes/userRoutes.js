import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import { User } from '../../../../models';
import { generateToken } from '../utils';

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    // const isMatchPass = await bcrypt.compare(password, user.password);

    // if (!isMatchPass) {
    //   return res.status(404).json({ message: 'Invalid Email or Password' });
    // }

    const token = generateToken({
      name: user.name,
      email: user.email,
    });

    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existEmail = await User.findOne({ where: { email } });

    if (!existEmail) {
      return res.status(404).json({ message: 'try another email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    return res.status(200).json(token);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});
