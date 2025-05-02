import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type Credentials = {
  email: string;
  password: string;
};

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials: Credentials, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signin',
        credentials
      );

      const token = await response.data;

      return token;
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
};

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload;
    }),
});

export default authSlice.reducer;
