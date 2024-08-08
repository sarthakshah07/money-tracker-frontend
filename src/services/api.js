import axios from "axios";
import { getUser } from "./token";

const axiosInstance = axios.create({
  // baseURL: "https://reqres.in",
  // baseURL:"http://192.168.0.194:6000",
  // baseURL : "http://localhost:8000/api",
  baseURL:"https://money-tracker-backend-z23g.onrender.com/api",
  // headers: {
  //   "Content-Type": "application/json",
  // }
  timeout: 1000 * 50,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": "true",
  },
});

axiosInstance.interceptors.request.use(config => {
  const user = getUser();
  console.log("user", user);
  if (user?.user && user?.user._id) {
    config.headers["user"] = user.user._id;
  }
  return config;
});

// const instance: AxiosInstance = axios.create({
//   baseURL: config.apiURL,
//   timeout: 1000 * 50,
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Headers": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Credentials": "true",
//   },
// })
export default axiosInstance;
