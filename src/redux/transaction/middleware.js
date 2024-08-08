
import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader } from "../lem/lemSlice";
import { addTransactionAsync, deleteTransactionAsync, getAllOwnedCategoriesAsync, getAllTransactionAsync, loginWithEmailAsync, logoutAsync, signUpAsync, updateTransactionAsync, updateUserAsync } from "./services";


export const getAllOwnedCategoriesAction = createAsyncThunk(
  "transaction/getAllOwnedCategoriesAction",
  async (_, { rejectWithValue, dispatch }) => {
    let userData;
    try {
      const response = await getAllOwnedCategoriesAsync();
      return response;
      
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);
export const getAllTransactionAction = createAsyncThunk(
  "transaction/getTransaction",
  async (_, { rejectWithValue, dispatch }) => {
    let userData;
    try {
      const response = await getAllTransactionAsync();
      return response;
      
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);
export const addTransactionAction = createAsyncThunk(
  "addTransactionAction",
  async (request, { rejectWithValue, dispatch }) => {
    try {
    console.log("request  asyncMIDDLE", request);

      const response = await addTransactionAsync(request);
      return response;
      
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);

export const updateTransactionAction = createAsyncThunk(
  "updateTransactionAction",
  async (request, { rejectWithValue, dispatch }) => {
    try {
    console.log("request  asyncMIDDLE", request);
      const response = await updateTransactionAsync(request); 
      return response;
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);

export const deletedTransactionAction = createAsyncThunk(
  "deletedTransactionAction",
  async (request, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteTransactionAsync(request);
      return response;
      
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);
