import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AddCircleOutline, BarChartOutlined, CancelOutlined, CancelPresentationRounded, CancelPresentationSharp, CancelSharp, DashboardCustomizeOutlined, Logout, SettingsAccessibility, TrendingUpOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../services/token";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signOut } from "../redux/auth/authSlice";
import Swal from 'sweetalert2'
import { Colors } from "../services/colors";
import { enqueueSnackbar } from "notistack";
import { sidebarItems } from "../utils/mockData";


const SideBar = ({ setOpen }) => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const dispatch = useDispatch();
  const color = 'black';
  const { currentUser } = useSelector(authSelector);
  // const [isAuth, setIsAuth] = useState(getUser());
  const navigate = useNavigate();
  const pathname = useLocation().pathname.split('/').pop();
  // useEffect(() => {
  //   setIsAuth(getUser());
  // },[getUser()]);\
  const handleNavigate = (path) => {
    setOpen && setOpen(false);
    navigate(path);
  }
  const handleLogout = async () => {
    setOpen && setOpen(false);
    Swal.fire({
      title: 'Are you sure!',
      text: 'Do you want to Logout?',
      icon: 'question',
      confirmButtonText: 'Continue',
      confirmButtonColor: `${Colors.fillers}`,
      iconColor: `${Colors.fillers}`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(signOut());

        enqueueSnackbar('Logged out successfully', { variant: 'success' });
      }
    })
  }
  return (
    <Grid
      container>
      <Grid item xs={12} display={"flex"} justifyContent={"space-between"} alignItems={"center"} bgcolor={Colors.primary} >
        <Typography variant="h5" sx={{ color: "white", flexGrow: 1, }} p={2} textAlign={"center"}>Money Tracker</Typography>
        {isMobile &&
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <CancelOutlined />
          </IconButton>
        }
      </Grid>
      {currentUser?.user?.name && (
        <Grid item xs={12} sx={{ color: "white", borderBlockEnd: `1px solid ${Colors.secondary}` }}>
          <Typography variant="h6" sx={{ color: "white" }} textAlign={"center"}>Hi, {currentUser.user.name}</Typography>
        </Grid>
      )}
      <Grid item xs={12} sx={{ margin: "0 auto", color: "white" }}>
        <List>
          {sidebarItems?.map((item) => (
            <ListItem button key={item.title} sx={{color:pathname===item.title.toLowerCase() ? Colors.fillers : "white",
            //  borderBottom: pathname === item.title.toLowerCase() ? `1px solid ${Colors.fillers}` : "none"
            }} 
             onClick={() => handleNavigate(item.path)} className="listItem">
              <ListItemIcon className="listIcon" sx={{color:pathname===item.title.toLowerCase() ? Colors.fillers : "white"}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
          <ListItem button onClick={handleLogout} className="listItem" sx={{ borderBlockStart: `1px solid ${Colors.secondary}` }}>
            <ListItemIcon className="listIcon">
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Grid>


    </Grid>
  );
};

export default SideBar;
