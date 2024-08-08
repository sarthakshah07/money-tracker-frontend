import { createTheme } from "@mui/material/styles";
import moment from "moment";
export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
export const formatDate = (date) => {
  if(!date) return ""
  return moment(date).format("Do MMM,YYYY");
}
export const transactionTypeColor = (type) => {
  if (type === "credit") {
    return "green";
  } else {
    return "red";
  }
}