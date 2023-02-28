import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import validationReducer from "../features/auth/validationSlice";
import modalReducer from "../features/helpers/modalSlice";
import mainReducer from "../features/main/mainSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    modals: modalReducer,
    validation: validationReducer,
  },
});
