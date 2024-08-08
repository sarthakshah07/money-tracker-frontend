
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import { getUser, removeUser, setUser } from "../../services/token";
import { hideLoader, showLoader } from "../lem/lemSlice";
import { loginWithEmailAsync, logoutAsync, signUpAsync, updateUserAsync } from "./services";
// import { useNavigate } from "react-router-dom";
// import {
//  auth
// } from "firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import Swal from "sweetalert2";
import CommonToast from "../../components/CommontToast/index";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";


export const loginUserByEmailAction = createAsyncThunk(
  "auth/loginByEmail",
  async (request, { rejectWithValue, dispatch }) => {
    let userData;
    try {
      const response = await loginWithEmailAsync(request);
      return response;
      
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);

export const logoutUserAction = createAsyncThunk(
  "auth/logout",
  async (request, { rejectWithValue, dispatch }) => {
    try {
      setTimeout(() => {
        dispatch(showLoader());
      }, 2000);
      // const response = await logoutAsync(request);
      // if (response.status === 200 ) {
      //   await removeUser();
      //   dispatch(hideLoader());
      //   window.location.reload()
      //   return null;
      // }
      // return rejectWithValue(response);
      await removeUser();
      dispatch(hideLoader())
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);
export const signUpUserAction = createAsyncThunk(
  "auth/signup",
  async (request, { rejectWithValue, dispatch }) => {
    let userData;
    try {
      console.log("dispatch==>", request);
      let name = request?.firstName
      let email = request?.email
      let password = request?.password
      console.log("valuesssss=>", name, email, password);
      const response = await signUpAsync(request);

    
      return response
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "auth/updateUser",
  async (request, { rejectWithValue, dispatch }) => {
    let userData;
    try {
      console.log("dispatch==>", request);
      let name = request?.firstName
      let email = request?.email
      let password = request?.password
      const response = await updateUserAsync(request);
      return response
    } catch (error) {
      dispatch(hideLoader());
      return rejectWithValue(error);
    }
  }
);