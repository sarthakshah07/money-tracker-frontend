
import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader } from "../lem/lemSlice";
import {getAllReportsAsync} from "./services"

export const getAllReportsAction = createAsyncThunk(
  "reports/getAllReportsAction",
  async (_, { rejectWithValue, dispatch }) => {
    let userData;
    try {
      const response = await getAllReportsAsync();
      return response;
      
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);
