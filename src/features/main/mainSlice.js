import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mainService from "./mainService";

const artists = JSON.parse(localStorage.getItem("artists"));

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getArtists = createAsyncThunk(
  "main/getArtists",
  async (thunkAPI) => {
    try {
      const response = await mainService.getArtists();
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
      state.artists = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.artists = action.payload;
      })
      .addCase(getArtists.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.artists = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
