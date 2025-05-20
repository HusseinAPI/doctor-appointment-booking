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

export const isAuth = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

export const setTokenInCookie = (res, token) => {
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export const clearCookie = (res) => {
  res.clearCookie('authToken', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
};
