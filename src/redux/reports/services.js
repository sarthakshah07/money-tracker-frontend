import axiosInstance from "../../services/api";
import { getUser } from "../../services/token";

// login apis url
//  const LoginUserUrl = "/api/login";
const getTransactionByUserUrl = "reports/";
export const getAllReportsAsync = async () => {
  try {
    const response = await axiosInstance.get(getTransactionByUserUrl);
    return response;
  } catch (err) {
    return err;
  }
};
