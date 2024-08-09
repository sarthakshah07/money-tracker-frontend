import axiosInstance, { isAxiosError } from "../../services/api";

// login apis url
//  const LoginUserUrl = "/api/login";
const LoginUserUrl = "/users/login";
const LogoutUserUrl = "/api/logout";
const SignUpUrl = "users/signup";
const UpdateUserUrl = "users/update";

export const loginWithEmailAsync = async (request) => {
  try {
    const response = await axiosInstance.post(LoginUserUrl, request);
    return response;
  } catch (err) {
    
    return isAxiosError(err) ;
  }
};

export const logoutAsync = async (request) => {
  try {
    const response = await axiosInstance.get(LogoutUserUrl, request);
    return response;
  } catch (err) {
    return err;
  }
};
export const signUpAsync = async (request) => {
  try {
    console.log("request ",request);
    const response = await axiosInstance.post(SignUpUrl, request);
    console.log("api response", response);
    return response;
  } catch (err) {
    return err;
  }
};
export const updateUserAsync = async (request) => {
  try {
    console.log("request ",request);
    const response = await axiosInstance.put(`${UpdateUserUrl}/${request.userId}`, request);
    console.log("api response", response);
    return response;
  } catch (err) {
    return err;
  }
};
