import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import db from '../models/index.js';
const { User, Appointment, Doctor } = db;
import { generateToken, isAuth, setTokenInCookie } from '../utils.js';

// SignIn

router.post('/signin', async (req, res) => {
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
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setTokenInCookie(res, token);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// SignUp

router.post('/signup', async (req, res) => {
  const { name, email, phone, dateOfBirth, password } = req.body;

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
      role: 'patient',
    });

    const userInfo = await User.findOne({ where: { email } });

    const payload = {
      id: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
    };

    const token = generateToken(payload);

    setTokenInCookie(res, token);

    return res.status(200).json(token);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Stay logged in

router.get('/patientAuth', isAuth, (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server internal Error' });
  }
});

// Book an appointment

router.post('/bookappointment', isAuth, async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, phone, date, doctor } =
    req.body;
  const { id } = req.user;

  try {
    await Appointment.create({
      userId: id,
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      dateOfAppointment: date,
      doctorId: doctor,
    });

    return res.status(200).json({ message: 'Successfuly booking appointment' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal Error' });
  }
});

// fetch appointments of doctor selected

router.get('/allAppointments/:doctorId', isAuth, async (req, res) => {
  const { doctorId } = req.params;
  try {
    const allAppointments = await Appointment.findAll({ where: { doctorId } });
    return res.status(200).json(allAppointments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal error' });
  }
});

// Check user appointments

router.get('/userAppointments', isAuth, async (req, res) => {
  const { id } = req.user;

  try {
    const userAppointments = await Appointment.findAll({
      where: { user_id: id },
    });

    const uniqueDoctorIds = [
      ...new Set(userAppointments.map((app) => app.dataValues.doctorId)),
    ];

    const doctors = await Doctor.findAll({ where: { id: uniqueDoctorIds } });
    return res.status(200).json({ userAppointments, doctors });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Internal error' });
  }
});

export default router;
