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

export const bookAppointment = createAsyncThunk(
  'auth/bookAppointment',
  async (appointmentDetails, thnukAPI) => {
    const { rejectWithValue } = thnukAPI;
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/bookappointment',
        appointmentDetails,
        { withCredentials: true }
      );

      const result = await response.data;

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAppointments = createAsyncThunk(
  'auth/fetchAppointments',
  async (doctorId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/allAppointments/${doctorId}`,
        { withCredentials: true }
      );

      const appointments = await response.data;

      return appointments;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserAppointments = createAsyncThunk(
  'auth/fetchUserAppointments',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/userAppointments',
        { withCredentials: true }
      );

      const appointments = await response.data;

      return appointments;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

type AuthState = {
  isLogged: boolean;
  name: string | null;
  role: string | null;
  isBooking: string | null;
  appointments: [] | undefined;
};

const initialState: AuthState = {
  isLogged: false,
  name: null,
  role: null,
  isBooking: null,
  appointments: [],
};

type MyPayloadType = {
  id: number;
  role: string;
  name: string;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    emptyAppointments: (state) => {
      state.appointments = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLogged = true;
        const decode = jwtDecode<MyPayloadType>(action.payload);
        state.name = decode.name;
        state.role = decode.role;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogged = true;
        const decode = jwtDecode<MyPayloadType>(action.payload);
        state.name = decode.name;
        state.role = decode.role;
      })
      .addCase(userStayLogged.fulfilled, (state, action) => {
        if (action.payload.user.email && action.payload.user.role) {
          state.isLogged = true;
          state.name = action.payload.user.name;
          state.role = action.payload.user.role;
        }
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.isBooking = action.payload;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
      }),
});

export const { emptyAppointments } = authSlice.actions;
export default authSlice.reducer;
