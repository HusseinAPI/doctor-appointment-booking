import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import UserModel from './user.js';
import DoctorModel from './doctor.js';
import AppointmentModel from './appointment.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '..', 'config', 'config.json');
const rawConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const config = rawConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {
  sequelize,
  Sequelize,
  User: UserModel(sequelize, DataTypes),
  Doctor: DoctorModel(sequelize, DataTypes),
  Appointment: AppointmentModel(sequelize, DataTypes),
};

export default db;
