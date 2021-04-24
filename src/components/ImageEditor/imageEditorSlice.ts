import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Area } from "react-easy-crop/types";
import { RootState } from "../../app/store";
import { getCroppedImg } from "../../lib/canvasUtils";

interface ImageEditorState {
  loading: boolean;
  error: Error;
  croppedSrc: string;
}

const initialState: ImageEditorState = {
  loading: false,
  croppedSrc: null,
  error: null,
};

export const imageEditorSlice = createSlice({
  name: "imageEditor",
  initialState,
  reducers: {
    generateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    generateFailure: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
    generateSucess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = null;
      state.croppedSrc = action.payload;
    },
  },
});

export const {
  generateStart,
  generateFailure,
  generateSucess,
} = imageEditorSlice.actions;

export const generateAsync = ({
  src,
  croppedAreaPixels,
  rotation,
}: {
  src: string;
  croppedAreaPixels: Area;
  rotation: number;
}) => async (dispatch, getState) => {
  try {
    dispatch(generateStart());
    dispatch(
      generateSucess(await getCroppedImg(src, croppedAreaPixels, rotation))
    );
  } catch (error) {
    dispatch(generateFailure(error));
  }
};

export const selectImageEditor = ({ imageEditorReducder }: RootState) =>
  imageEditorReducder;

export default imageEditorSlice.reducer;
