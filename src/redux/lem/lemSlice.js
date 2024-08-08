import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  message: "",
  buttonLoading: false,
  buttonMesage: "",
};

const lemSlice = createSlice({
  name: "Lem",
  initialState: INITIAL_STATE,
  reducers: {
    showLoader: (state, { payload }) => ({
      ...state,
      loading: true,
      message: payload?.message,
    }),

    hideLoader: (state) => ({
      ...state,
      loading: false,
      message: "",
    }),

    showButtonLoader: (state, { payload }) => ({
      ...state,
      buttonLoading: true,
      buttonMesage: payload?.message,
    }),

    hideButtonLoader: (state) => ({
      ...state,
      buttonLoading: false,
      buttonMesage: "",
    }),
  },
});

export const { showLoader, hideLoader, showButtonLoader, hideButtonLoader } = lemSlice.actions;

export const lemSelector = (state) => state?.Lem;

export default lemSlice.reducer;
