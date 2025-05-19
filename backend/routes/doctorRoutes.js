import express from 'express';
const router = express.Router();
import db from '../models/index.js';
const { Doctor } = db;
import { isAuth } from '../utils.js';

// Fetch doctors

router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.findAll();

    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server Internal Error');
  }
});

router.get('/doctors/:doctorName', isAuth, async (req, res) => {
  const { doctorName } = req.params;

  try {
    if (doctorName) {
      const doctor = await Doctor.findOne({ where: { name: doctorName } });
      return res.status(200).json(doctor);
    }
    return res.status(400).json({ message: 'Invalid Data' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
});

export default router;
