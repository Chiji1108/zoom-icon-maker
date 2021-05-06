import { configureStore } from "@reduxjs/toolkit";
import imageEditorReducder from "../components/ImageEditor/imageEditorSlice";
import modalReducer from "../components/Modal/ModalSlice";

export const store = configureStore({
  reducer: {
    imageEditorReducder,
    modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
