import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userInfo) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

  const options = { expiresIn };

  const token = jwt.sign(userInfo, secretKey, options);

  return token;
};
