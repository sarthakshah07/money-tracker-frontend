import { createSlice } from "@reduxjs/toolkit";
import { getAllReportsAction } from "./middleware";
const INITIAL_STATE = {
  reportsData: [],
};

const reportsSlice = createSlice({
  name: "Reports",
  initialState: INITIAL_STATE,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getAllReportsAction.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      return (
        {
          ...state,
          reportsData: payload.data,
        })
    });
  },
});
export const reportsSelector = (state) => state.Reports;

export default reportsSlice.reducer;
