import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDoctors = createAsyncThunk(
  'doctor/getDoctors',
  async (_N_E_STYLE_LOAD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(
        'http://localhost:5000/api/appointment/doctors',
        { withCredentials: true }
      );

      const data = await response.data;

      if (data) {
        return data;
      }
      return;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getSelectedDoctor = createAsyncThunk(
  'doctor/getSelectedDoctor',
  async (doctorName, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/appointment/doctors/${doctorName}`,
        { withCredentials: true }
      );

      const doctor = await response.data;
      return doctor;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  doctors: [],
  doctorSelected: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    // Selected doctor
    selectDoctor: (state, action) => {
      state.doctorSelected = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
      })
      .addCase(getSelectedDoctor.fulfilled, (state, action) => {
        state.doctorSelected = action.payload;
      }),
});

export const { selectDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
