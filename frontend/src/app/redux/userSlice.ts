import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
        credentials,
        { withCredentials: true }
      );

      const token = await response.data;

      if (!token) {
        return null;
      }

      return token;
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
        registerData,
        { withCredentials: true }
      );

      const token = await response.data;

      if (!token) {
        return null;
      }

      return token;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Something went wrong');
    }
  }
);

export const userStayLogged = createAsyncThunk(
  'auth/stayLogged',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/patientAuth',
        { withCredentials: true }
      );
      const data = response.data;

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Please login and try again');
    }
  }
);

type AuthState = {
  isLogged: boolean;
  role: string | null;
};

const initialState: AuthState = {
  isLogged: false,
  role: null,
};

type MyPayloadType = {
  role: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLogged = true;
        const decode = jwtDecode<MyPayloadType>(action.payload);
        state.role = decode.role;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogged = true;
        const decode = jwtDecode<MyPayloadType>(action.payload);
        state.role = decode.role;
      })
      .addCase(userStayLogged.fulfilled, (state, action) => {
        if (action.payload.user.email && action.payload.user.role) {
          state.isLogged = true;
          state.role = action.payload.user.role;
        }
      }),
});

export default authSlice.reducer;
