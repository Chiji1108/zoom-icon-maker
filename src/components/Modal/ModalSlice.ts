import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type Modal = "ImageEditor" | "Setting";

interface ModalState {
  open?: Modal;
}

const initialState: ModalState = {
  open: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<Modal>) {
      state.open = action.payload;
    },
    closeModal(state) {
      state.open = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = ({ modalReducer }: RootState) => modalReducer;

export default modalSlice.reducer;
