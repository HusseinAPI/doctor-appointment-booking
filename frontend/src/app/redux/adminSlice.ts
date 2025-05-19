import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteAppointment = createAsyncThunk(
  'admin/deleteAppointment',
  async (appId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.delete(
        'http://localhost:5000/api/adminPanelOfCenter/deleteAppointment',

        { data: { appId }, withCredentials: true }
      );

      const message = await response.data;
      return message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const checkIsAdmin = createAsyncThunk(
  'admin/checkIsAdmin',
  async (_N_E_STYLE_LOAD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get(
        'http://localhost:5000/api/adminPanelOfCenter',
        { withCredentials: true }
      );
      const role = await response.data;

      return role;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const addDoctor = createAsyncThunk(
  'admin/addDoctor',
  async (doctorData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/adminPanelOfCenter/addDoctor',
        doctorData,
        { withCredentials: true }
      );

      const message = await response.data;
      return message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const editDoctor = createAsyncThunk(
  'admin/editDoctor',
  async (doctorData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.put(
        'http://localhost:5000/api/adminPanelOfCenter/editDoctor',
        doctorData,
        { withCredentials: true }
      );

      const message = await response.data;
      return message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'admin/deleteDoctor',
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.put(
        'http://localhost:5000/api/adminPanelOfCenter/deleteDoctor',
        id,
        { withCredentials: true }
      );

      const message = await response.data;
      return message;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  theRole: null,
};

const adminSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(checkIsAdmin.fulfilled, (state, action) => {
      state.theRole = action.payload;
    }),
});

export default adminSlice.reducer;
