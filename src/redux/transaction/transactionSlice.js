import { createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "../../services/token";
import { addTransactionAction, deletedTransactionAction, getAllOwnedCategoriesAction, getAllTransactionAction, loginUserByEmailAction, logoutUserAction, signUpUserAction, updateTransactionAction, updateUserAction } from "./middleware";

const INITIAL_STATE = {
  transactionData: [],
  ownedCategories:[]
};

const transactionSlice = createSlice({
  name: "Transaction",
  initialState: INITIAL_STATE,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getAllOwnedCategoriesAction.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      return (
        {
          ...state,
          ownedCategories: payload.data,
        })
    });
    builder.addCase(getAllTransactionAction.fulfilled, (state, { payload }) => {
      console.log("payload", payload);
      return (
        {
          ...state,
          transactionData: payload.data,
        })
    });
    builder.addCase(addTransactionAction.fulfilled, (state, { payload }) => {
      console.log("payload", payload.data);
      const newdata = [payload.data, ...state.transactionData]
      console.log("newdata", newdata);
      return (
        {
          ...state,
          transactionData: newdata,
        })
    });
    builder.addCase(updateTransactionAction.fulfilled, (state, { payload }) => {

      const newdata = state.transactionData.map(transaction => transaction?._id === payload.data?._id ? payload.data : transaction)

      return (
        {
          ...state,
          transactionData: newdata,
        })
    });
    builder.addCase(deletedTransactionAction.fulfilled, (state, { payload }) => {
      console.log("payload",payload, payload?.data.deletedTransaction);
      let newData = [...state.transactionData]
      const filteterdata = newData.filter(transaction => transaction?._id !== payload?.data.deletedTransaction?._id)
      // const newdata = state.transactionData.filter(transaction => transaction?._id !== payload.deletedTransaction?._id)
      console.log("payload newdata",newData, filteterdata);
      return {
        ...state,
        transactionData: filteterdata,
      };
     
    });
  },
});
// export const {  } = transactionSlice.actions;
export const transactionSelector = (state) => state.Transaction;

export default transactionSlice.reducer;
