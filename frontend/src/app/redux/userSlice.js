import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, thunkAPI) => {
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
  async (registerData, thunkAPI) => {
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

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_N_E_STYLE_LOAD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/userInfo',
        { withCredentials: true }
      );

      const userInfo = await response.data;

      return userInfo;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

// LogOut

export const logOut = createAsyncThunk(
  'user/logOut',
  async (_N_E_STYLE_LOAD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(
        'http://localhost:5000/api/auth/logOut',
        { withCredentials: true }
      );

      const result = await response.data;

      if (result) {
        return result;
      }
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLogged: false,
  name: null,
  role: null,
  isBooking: null,
  appointments: [],
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Empty Appointments State

    emptyAppointments: (state) => {
      state.appointments = [];
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLogged = true;
        const decode = jwtDecode(action.payload);
        state.name = decode.name;
        state.role = decode.role;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLogged = true;
        const decode = jwtDecode(action.payload);
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
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLogged = false;
        state.name = null;
        state.user = null;
        state.role = null;
        state.appointments = [];
      }),
});

export const { emptyAppointments } = authSlice.actions;
export default authSlice.reducer;
