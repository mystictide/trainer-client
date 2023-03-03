import { configureStore } from "@reduxjs/toolkit";
import cmsReducer from "../features/cms/cmsSlice";
import modalReducer from "../features/helpers/modalSlice";
import mainReducer from "../features/main/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    cms: cmsReducer,
    modals: modalReducer,
  },
});
