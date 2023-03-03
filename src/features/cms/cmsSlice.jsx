import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithDate } from "../../assets/js/helpers";
import cmsService from "./cmsService";

const filteredData = JSON.parse(getWithDate("filteredExercises"));
const categories = JSON.parse(getWithDate("categories"));

const initialState = {
  filteredData: filteredData ? filteredData : null,
  cats: categories ? categories : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: null,
};

export const getCategories = createAsyncThunk(
  "cms/getCategories",
  async (thunkAPI) => {
    try {
      const response = await cmsService.getCategories();
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

export const filterExercises = createAsyncThunk(
  "cms/filterExercises",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.filterExercises(reqData);
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

export const manageExercise = createAsyncThunk(
  "cms/manageExercise",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.manageExercise(reqData);
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

export const manageCategory = createAsyncThunk(
  "cms/manageCategory",
  async (reqData, thunkAPI) => {
    try {
      const response = await cmsService.manageCategory(reqData);
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

export const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    reset: (state) => {
      state.cats = null;
      state.filteredData = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = null;
      localStorage.removeItem("filteredExercises");
      localStorage.removeItem("categories");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cats = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.cats = null;
      })
      .addCase(filterExercises.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.filteredData = action.payload;
      })
      .addCase(filterExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.filteredData = null;
      })
      .addCase(manageExercise.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(manageExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(manageExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
      })
      .addCase(manageCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(manageCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(manageCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
      });
  },
});

export const { reset } = cmsSlice.actions;
export default cmsSlice.reducer;
