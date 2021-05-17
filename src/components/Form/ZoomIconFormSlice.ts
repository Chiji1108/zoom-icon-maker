import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ZoomIconFormState {
  generator: {
    status: "loading" | "idle";
    error: Error;
    artifact: string;
  };
  setting: {
    useBio: boolean;
    font: string;
    icon: string;
  };
}

const initialState: ZoomIconFormState = {
  value: {
    src: null,
    name: null,
    bio: null,
  },
  generator: {
    status: Status.WAITING,
    error: null,
    artifact: null,
  },
  setting: {
    useBio: true,
    font: "Noto Sans JP",
    icon: null,
  },
};
