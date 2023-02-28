import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import validationService from "./validationService";

const initialState = {
  checking: false,
  usernameExists: false,
  emailExists: false,
};

export const checkExistingUsername = createAsyncThunk(
  "validation/cusername",
  async (username, thunkAPI) => {
    try {
      const response = await validationService.checkExistingUsername(username);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const checkExistingMail = createAsyncThunk(
  "validation/cmail",
  async (email, thunkAPI) => {
    try {
      const response = await validationService.checkExistingMail(email);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    reset: (state) => {
      state.checking = false;
      state.usernameExists = false;
      state.emailExists = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkExistingUsername.pending, (state, action) => {
        state.checking = true;
      })
      .addCase(checkExistingUsername.fulfilled, (state, action) => {
        state.checking = false;
        state.usernameExists = action.payload;
      })
      .addCase(checkExistingMail.fulfilled, (state, action) => {
        state.checking = false;
        state.emailExists = action.payload;
      });
  },
});

export const { reset } = validationSlice.actions;
export default validationSlice.reducer;
