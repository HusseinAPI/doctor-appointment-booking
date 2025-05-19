import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import doctorSlice from './doctorSlice';
import adminSlice from './adminSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    doctorSlice,
    adminSlice,
  },
});
