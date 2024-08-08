import axiosInstance from "../../services/api";
import { getUser } from "../../services/token";

// login apis url
//  const LoginUserUrl = "/api/login";
const addTransactionUrl = "/transactions";
const getTransactionByUserUrl = "transactions/";
const SignUpUrl = "users/signup";
const UpdateUserUrl = "users/update";
export const getAllOwnedCategoriesAsync = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response;
  } catch (err) {
    return err;
  }
}
export const getAllTransactionAsync = async () => {
  try {
    const response = await axiosInstance.get(getTransactionByUserUrl);
    return response;
  } catch (err) {
    return err;
  }
};
export const addTransactionAsync = async (request) => {
  try {
    
    console.log("request  async", request);
    const response = await axiosInstance.post(addTransactionUrl,request);
    return response;
  } catch (err) {
    return err;
  }
};

export const updateTransactionAsync = async (request) => {
  try {
    console.log("request  async", request);
    const response = await axiosInstance.put(`/transactions/${request?._id}`,request);
    return response;
  } catch (err) {
    return err;
  }
};


export const deleteTransactionAsync = async (id) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};
