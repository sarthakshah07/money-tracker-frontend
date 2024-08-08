import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import lemSlice from "./lem/lemSlice";
import transactionSlice from "./transaction/transactionSlice";
import reportsSlice from "./reports/reportsSlice";

const rootReducer = combineReducers({
  Auth: authSlice,
  Transaction : transactionSlice,
  Reports : reportsSlice,
  Lem: lemSlice,
});

export default rootReducer;
