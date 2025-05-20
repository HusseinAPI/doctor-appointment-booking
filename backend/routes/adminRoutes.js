import express from 'express';
const router = express.Router();
import db from '../models/index.js';
const { Appointment, Doctor } = db;
import { isAuth } from '../utils.js';

// Check is admin

router.get('/', isAuth, async (req, res) => {
  const { role } = req.user;

  try {
    if (role === 'patient') {
      return res.status(404).json({ message: 'Not Found Page' });
    }

    return res.status(200).json(role);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
});

// Delete appointment

router.delete('/deleteAppointment', isAuth, async (req, res) => {
  const { appId } = req.body;
  const { role } = req.user;

  try {
    if (role === 'admin') {
      const deleted = await Appointment.destroy({
        where: { id: appId },
      });

      if (deleted === 0) {
        return res.status(404).json({ message: 'Appointment not deleted' });
      }

      return res
        .status(200)
        .json({ message: 'Appointment deleted successfully' });
    }

    return res.status(404).json({ message: 'Not Found Page' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
});

// Add doctor

router.post('/addDoctor', isAuth, async (req, res) => {
  const { name, specialization, rating, location, buttonColor, imageUrl, bio } =
    req.body;
  const { role } = req.user;

  try {
    if (role === 'admin') {
      await Doctor.create({
        name,
        specialization,
        rating,
        location,
        button_color: buttonColor,
        image_url: imageUrl,
        bio,
      });

      return res.status(200).json({ message: 'Successfully Doctor Added' });
    }

    return res.status(404).json({ message: 'Not Found Page' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
});

// Edit doctor

router.put('/editDoctor', isAuth, async (req, res) => {
  const {
    id,
    name,
    specialization,
    rating,
    location,
    buttonColor,
    imageUrl,
    bio,
  } = req.body;
  const { role } = req.user;

  try {
    if (role === 'admin') {
      const [updatedRows] = await Doctor.update(
        {
          name,
          specialization,
          rating,
          location,
          button_color: buttonColor,
          image_url: imageUrl,
          bio,
        },
        {
          where: { id },
        }
      );

      if (updatedRows === 0) {
        return res
          .status(404)
          .json({ message: 'Doctor not found or nothing to update' });
      }

      return res.status(200).json({ message: 'Successfully Doctor Edited' });
    }

    return res.status(404).json({ message: 'Not Found Page' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
});

// Delete doctor

router.put('/deleteDoctor', isAuth, async (req, res) => {
  const { id } = req.body;
  const { role } = req.user;

  try {
    if (role === 'admin') {
      const deleted = await Doctor.destroy({
        where: { id },
      });

      await Appointment.destroy({
        where: { doctorId: id },
      });

      if (deleted === 0) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      return res.status(200).json({ message: 'Doctor deleted successfully' });
    }

    return res.status(404).json({ message: 'Not Found Page' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
