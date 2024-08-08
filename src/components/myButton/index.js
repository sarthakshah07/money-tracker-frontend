import { Button } from "@mui/material";
import { Colors } from "../../services/colors";

export default function MyButton({startIcon,endIcon,title,onClick,...props}){
  return (
    <Button 
      startIcon={startIcon}
      endIcon={endIcon}
      size='small'
      variant='outlined'
      sx={{
        color:Colors.fillers,
        borderColor: Colors.fillers,
      }}
      onClick={onClick}
      
      {...props}
    >
      {title}
    </Button>
  );
}
