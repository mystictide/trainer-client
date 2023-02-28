import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photoActive: false,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    updatePhotoState(state) {
      state.photoActive = !state.photoActive;
    },
  },
});

export const { updatePhotoState } = modalSlice.actions;
export default modalSlice.reducer;
