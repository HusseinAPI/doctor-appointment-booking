import express from 'express';
const router = express.Router();
import db from '../models/index.js';
const { Doctor } = db;
import { isAuth } from '../utils.js';

// Fetch doctors

router.get('/doctors', isAuth, async (req, res) => {
  try {
    const doctors = await Doctor.findAll();

    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server Internal Error');
  }
});

export default router;
