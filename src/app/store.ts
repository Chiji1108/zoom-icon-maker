import { configureStore } from "@reduxjs/toolkit";
import imageEditorReducder from "../components/ImageEditor/imageEditorSlice";

export const store = configureStore({
  reducer: {
    imageEditorReducder,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
