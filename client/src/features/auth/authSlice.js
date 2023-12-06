import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signout } from './authAPI';
import { updateUser } from '../user/userAPI';



const initialState = {
  loggedInUser: null,
  error: null,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const signoutAsync = createAsyncThunk(
  'users/signout',
  async (userId) => {
    const response = await signout(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'users/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'users/checkUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginData);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(signoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
  },
});



export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectError = (state) => state.auth.error
export default authSlice.reducer;
