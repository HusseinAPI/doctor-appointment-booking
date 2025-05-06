import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import doctorSlice from './doctorSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    doctorSlice,
  },
});
