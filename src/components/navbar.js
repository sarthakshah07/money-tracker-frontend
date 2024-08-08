import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logoutUserAction } from '../redux/auth/middleware';
import { enqueueSnackbar } from 'notistack';
import { Navigate, useNavigate } from 'react-router-dom';
import { removeUser } from '../services/token';
import Swal from 'sweetalert2';
import { Drawer, Grid, MenuItem, MenuList, Select } from '@mui/material';
import SideBar from './SideBar';
import { Dashboard, MenuBook, MenuSharp } from '@mui/icons-material';


const options = [
  { value: "dashboard", label: "Dashboard" },
  { value: "transactions", label: "Transactions" },
  { value: "reports", label: "Reports" },
  { value: "settings", label: "Settings" }
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("dashboard");
  const isMobile = window.innerWidth <= 768;
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {

    Swal.fire({
      title: "Are You Sure?",
      color: "#000",
      text: "Want to logout !",
      icon: "question",
      width: 600,
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      cancelButtonText: `No`,
      cancelButtonColor: "red",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        removeUser();
        enqueueSnackbar('Logged out successfully', { variant: 'success' });
        setTimeout(() => {

          navigate('/');
        }, 1500);
      }
    });

  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    navigate(`/${event.target.value}`);
  };

  return (
    <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
      <Grid item border={1} sx={{ flexGrow: 1, height: "10%", width: "100%", padding: 0,margin: 0}} >
        <AppBar position="static" sx={{ margin: 0, padding: 0, height: "100%", width: "100%", borderBottom: "1px solid goldenrod" }}>
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p:0 }}>
            <Button onClick={() => setOpen(true)} startIcon={<MenuSharp  sx={{height:"35px",width:"35px"}} />}  className='menuButon'/>

            <Typography variant="h4" textAlign={"center"}  sx={{ flexGrow: 1 }} >
              Money Tracker
            </Typography>
            {/* {isMobile && (
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="Select"
                onChange={handleChange}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button> */}
          </Toolbar>
        </AppBar>
        <Drawer open={open} anchor="left" onClose={() => setOpen(false)} >
          <SideBar setOpen={setOpen} />
        </Drawer>
      </Grid>
    </ThemeProvider>
  );
}

