import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Credentials = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  phone: string;
  dateOfBirth: string;
} & Credentials;

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: Credentials, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signin',
        credentials
      );

      const data = await response.data;

      if (!data) {
        return null;
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (registerData: RegisterData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        registerData
      );

      const data = await response.data;

      if (!data) {
        return null;
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

type AuthState = {
  token: string | null;
  isLogged: boolean;
  role: string | null;
};

const initialState: AuthState = {
  token: null,
  isLogged: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLogged = true;
        state.role = action.payload.role;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isLogged = true;
        state.role = action.payload.role;
      }),
});

export default authSlice.reducer;
