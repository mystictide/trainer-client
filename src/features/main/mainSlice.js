import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithDate } from "../../assets/js/helpers";
import mainService from "./mainService";

const artists = JSON.parse(getWithDate("artists"));
const artist = JSON.parse(localStorage.getItem("artist"));

const initialState = {
  artist: artist ? artist : null,
  artists: artists ? artists : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getArtist = createAsyncThunk(
  "main/getArtist",
  async (req, thunkAPI) => {
    try {
      const response = await mainService.getArtist(req);
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
      state.artist = null;
      localStorage.removeItem("artist")
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
      })
      .addCase(getArtist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArtist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.artist = action.payload;
      })
      .addCase(getArtist.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.artist = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
