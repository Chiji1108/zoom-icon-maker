import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Area } from "react-easy-crop/types";
import { RootState } from "../../app/store";
import { getCroppedImg } from "../../lib/canvasUtils";

interface ImageEditorState {
  loading: "idle" | "pending";
  imageSrc: string;
  error: Error;
}

const initialState: ImageEditorState = {
  loading: "idle",
  imageSrc: null,
  error: null,
};

export const imageEditorSlice = createSlice({
  name: "imageEditor",
  initialState,
  reducers: {
    generateStart: (state) => {
      state.loading = "pending";
      state.error = null;
    },
    generateFailure: (state, action: PayloadAction<Error>) => {
      state.loading = "idle";
      state.error = action.payload;
    },
    generateSucess: (state, action: PayloadAction<string>) => {
      state.loading = "idle";
      state.error = null;
      state.imageSrc = action.payload;
    },
  },
});

export const {
  generateStart,
  generateFailure,
  generateSucess,
} = imageEditorSlice.actions;

export const generateImage = (
  src: string,
  croppedAreaPixels: Area,
  rotation: number,
  onSuccess?: () => void
) => async (dispatch, getState) => {
  try {
    dispatch(generateStart());
    dispatch(
      generateSucess(await getCroppedImg(src, croppedAreaPixels, rotation))
    );
    onSuccess();
  } catch (error) {
    dispatch(generateFailure(error));
  }
};

export const selectImageEditor = ({ imageEditorReducder }: RootState) =>
  imageEditorReducder;

export default imageEditorSlice.reducer;
