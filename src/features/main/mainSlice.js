import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mainService from "./mainService";

const initialState = {
  exercises: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const exercisesByCategory = createAsyncThunk(
  "main/exercisesByCategory",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.exercisesByCategory(reqData);
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

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.exercises = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exercisesByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(exercisesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.exercises = action.payload;
      })
      .addCase(exercisesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.exercises = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
