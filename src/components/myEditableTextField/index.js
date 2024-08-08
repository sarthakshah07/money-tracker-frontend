import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Colors } from "../../services/colors";
import { Circle, CurrencyRupee, Info } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { transactionTypeColor } from "../../utils/utils";

const MyEditableTextField = ({ flag, value, onChange, type,transactionType, multiline, ...otherProps }) => {  console.log("valueee ",value);
 const renderInfo = (value) => {
  if (value.length > 20) {
    return <Info sx={{ color: Colors.fillers,cursor: "pointer" }} onClick={() => enqueueSnackbar(value, { variant: 'info' })} />
  }
 }
 const getColor = () => {
      if (type === 'number') {
        return transactionTypeColor(transactionType)
      }
     return 'white'
 }
  return (
    <TextField
    size="small"
      sx={{
        border: 'none',
        width: '100%',
        m:0,
        
        outline: 'none',
        backgroundColor: 'transparent',
        '& .MuiInputBase-input': {
          color: getColor(),
          border: 'none',
          width: '100%',
          backgroundColor: 'transparent',
          // flex:  1,
          // textOverflow: flag ? "initial" : 'ellipsis',
          // overflow: flag ? "initial" : 'hidden',
          whiteSpace: flag ? "none" : 'nowrap',
          '&.Mui-disabled': {
            color: 'red !important',
          },
          '&:focus': {
            outline: 'none',
            backgroundColor: 'transparent',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': { 
          border: flag ? '' : 'none',
        },
      }}
      // disabled={!flag}
      value={!flag && value.length > 20 ? value.slice(0, 20) + '...' : value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      type={type || 'text'}
      variant="outlined"
      multiline={multiline || false}
      
      // fullWidth
      InputProps={{
        startAdornment: type === 'number' && (
          <InputAdornment position="start">
            <IconButton edge="end">
              <CurrencyRupee sx={{ color: Colors.text }} />
            </IconButton>
          </InputAdornment>
        ),
        sx: {
          padding: 0,
        },
        endAdornment: renderInfo(value),
        otherProps,
        readOnly: !flag,
      }}
    />
  );
};

export default MyEditableTextField;
