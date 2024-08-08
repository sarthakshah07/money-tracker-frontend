import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Button, Typography, Box, CircularProgress, IconButton, Grid, colors, FormControl, InputLabel, FilledInput, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUserByEmailAction } from '../redux/auth/middleware';
import { useDispatch } from 'react-redux';
import { setUser } from '../services/token';
import { enqueueSnackbar } from 'notistack';
import Graphics from '../assests/images/graphics.png';
import { Colors } from '../services/colors';
import AuthModule from '../pages/authModule';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
function Login() {
  const [email, setEmail] = useState('shah770@gmail.com');
  const [password, setPassword] = useState('Admin@123');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  useGSAP(() => {
    gsap.fromTo(
      ".login",
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        // ease: "power4.out"
      }
    );

    return () => {
      gsap.to(".login", {
        opacity: 0,
        x: -100,
        duration: 1
      });
    };
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(loginUserByEmailAction({ email, password })).then(({ payload }) => {
        console.log("payload", payload);
        if (payload.status === 200 || payload.status === 201) {
          const data = JSON.stringify(payload.data);
          console.log(data);
          setUser(data);
          setIsLoading(false);
          enqueueSnackbar('Logged in successfully', { variant: 'success' });
        }
        else {
          setIsLoading(false);
          enqueueSnackbar(payload.message, { variant: 'error' });
        }

        // setTimeout(() => {

        navigate('/');
        // },[1500]);

      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (

    <AuthModule>

      <Stack
        spacing={2}
         className='login'
        sx={{
          // maxWidth: theme.breakpoints.values.md,
          margin: 'auto',
          // mx: 6,
        }}
      >
        <Typography variant="h4" color="white" bgcolor={"transparent"} >
          Sign In
        </Typography>
        <Typography variant="body1" color="white" bgcolor={"transparent"}>
          Welcome To Money Tracker To Track Your Expenses, income and balance.
        </Typography>
        <form onSubmit={handleSubmit} style={{ backgroundColor: "transparent" }} >
          <Stack spacing={2} bgcolor={"transparent"} >
            <TextField
              label="Email"
              type="email"
              variant='filled'
              // value={email}
              sx={{ "& .MuiInputBase-input.MuiFilledInput-input:-webkit-autofill": { boxShadow: "0 0 0 100px rgba(23, 20, 20, .98) inset" } }}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white", borderColor: "white", backgroundColor: "transparent" },
                notched: false,
                underline: {
                  "&:before": {
                    borderBottom: "1px solid golderod"
                  },
                  "&:after": {
                    borderBottom: "2px solid white"
                  }
                }
              }}
            />
            <FormControl sx={{ m: 1 }} fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput

                id="filled-adornment-password"
                type={isPasswordVisible ? 'text' : 'password'}
                sx={{ "& .MuiInputBase-input.MuiFilledInput-input:-webkit-autofill": { boxShadow: "0 0 0 100px rgba(23, 20, 20, .98) inset" } }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {isPasswordVisible ? <VisibilityOff  /> :
                        <Visibility  />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
       
            <Button
              type="submit"
              variant="text"
              fullWidth
              disabled={isLoading}
              sx={{
                zIndex: 999,
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: `${Colors.fillers}`,
                  border: `1px solid ${Colors.fillers}`,
                },
              }}
            >
              {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Login'}
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="body1" color="white" bgcolor={"transparent"} >
                Don't have an account?
              </Typography>
              <Button 
              variant="text"
              sx={{
                backgroundColor: 'transparent',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: `${Colors.fillers}`,
                  // border: `1px solid ${Colors.fillers}`,
                },
              }}
              onClick={() => navigate('/signup')}
            >
              Signup
            </Button>
          </Box>
          </Stack>
        </form>
      </Stack>
    </AuthModule>
  );
}

export default Login;

