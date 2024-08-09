import { createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "../../services/token";
import { loginUserByEmailAction, logoutUserAction, signUpUserAction, updateUserAction } from "./middleware";

const INITIAL_STATE = {
  currentUser: getUser() || null,
  userCategories: [],
};

const authSlice = createSlice({
  name: "Auth",
  initialState: INITIAL_STATE,
  reducers: {
    signOut: (state) => {
      console.log("signOut", state);
      removeUser();

      return {
        ...state,
        currentUser: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserByEmailAction.fulfilled, (state, { payload }) => {
      console.log("payload slice", payload, state.currentUser);
      if (payload.message) {
        return (
          {
            ...state,
            currentUser: null,
          })
      }
      setUser(payload.data)

      return (
        {
          ...state,
          currentUser: payload.data,
          userCategories: payload.data.user.categories || state.currentUser?.user?.categories
        })
    });
    builder.addCase(loginUserByEmailAction.rejected, (state, { payload }) => {
      console.log("payload slice rtejected", payload);
    

      return (
        {
          ...state,
          currentUser: null,
        })
    });
    builder.addCase(logoutUserAction.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: null,

    }));
    builder.addCase(signUpUserAction.fulfilled, (state, { payload }) => ({
      ...state,
      currentUser: payload.data,
      userCategories: payload.data.user.categories || state.currentUser?.user?.categories
    }));
    builder.addCase(updateUserAction.fulfilled, (state, { payload }) => {
      const newState = { ...state?.currentUser };
      newState.user = payload?.data;
      if (newState.user) {
        setUser(newState)
        return ({
          ...state,
          currentUser: newState || state.currentUser,
          userCategories: newState.user.categories || state.currentUser?.user?.categories
        })
      }
      else return;

    }
    )
  },
});
export const { signOut } = authSlice.actions;
export const authSelector = (state) => state.Auth;

export default authSlice.reducer;
