import React from 'react';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import Navbar from './navbar';
import SideBar from './SideBar';
import { Colors } from '../services/colors';

const WrapperComponent = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:600px)')
  return (
    // <Box sx={{ height: "100dvh",width:"100dvw" }} >
    <Grid container  height={"100dvh"}  bgcolor={Colors.primary}  >
        {isMobile && <Navbar />}
        {!isMobile &&
          <Grid item xs={2} sm={4} md={2} sx={{ borderRight: `1px solid ${Colors.fillers}` }} >
            <SideBar />
          </Grid>
        }
        <Grid item xs={12} sm={8} md={10} bgcolor={Colors.secondary} sx={{overflowY:"auto", height:"100%", width:"100%"}}>
          {children}
        </Grid>
      </Grid>
    // </Box>

  );
};

export default WrapperComponent;
