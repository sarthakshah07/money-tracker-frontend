import React, { useEffect, useState } from 'react';
import { Stack, TextField, Button, Typography, Box, CircularProgress, useTheme, FormControl, InputLabel, FilledInput, InputAdornment, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserAction } from '../redux/auth/middleware';
import { Colors } from '../services/colors';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { setUser } from '../services/token';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import AuthModule from '../pages/authModule';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MyButton from './myButton';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  useGSAP(() => {
    gsap.fromTo(
      ".signUp",
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
      gsap.to(".signUp", {
        opacity: 0,
        x: -100,
        duration: 1
      });
    };
  });

  const { currentUser } = useSelector((state) => state.Auth)
  useEffect(() => {
    if (currentUser) {
      console.log("currentUser in ", currentUser);
      navigate('/')
    }
  }, [currentUser]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUserAction({ email, password, name })).then(({ payload }) => {
      if (payload.status === 200 || payload.status === 201) {
        const data = JSON.stringify(payload.data);
        console.log(data);
        setUser(data);
        setIsLoading(false);
        enqueueSnackbar('Signed up successfully', { variant: 'success' });

      }
      else {
        setIsLoading(false);
        enqueueSnackbar(payload.message, { variant: 'error' });
      }
    });
  };
  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <AuthModule>
      <Stack
        spacing={2}
        className='signUp'
        sx={{
          // maxWidth: theme.breakpoints.values.md,
          margin: 'auto',
          // mx: 6,
        }}
      >
        <Typography variant="h4" color="white" bgcolor={"transparent"} >
          Sign Up
        </Typography>
        <Typography variant="body1" color="white" bgcolor={"transparent"}>
          Welcome To Money Tracker To Track Your Expenses, income and balance.
        </Typography>
        <form onSubmit={handleSubmit} style={{ backgroundColor: "transparent" }} >
          <Stack spacing={2} bgcolor={"transparent"} >
            <TextField
              label="Name"
              type="text"
              variant='filled'
              // sx={{ "& .MuiInputBase-input.MuiFilledInput-input:-webkit-autofill": { boxShadow: "0 0 0 100px rgba(23, 20, 20, .98) inset" } }}
              sx={{
                "& .MuiInputBase-input.MuiFilledInput-input:-webkit-autofill": { boxShadow: "0 0 0 100px rgba(23, 20, 20, .98) inset" },
                "& .css-1rv476z-MuiInputBase-input-MuiFilledInput-input": { boxShadow: "0 0 0 100px rgba(23, 20, 20, .98) inset" }
              }}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              // value={email}
              variant='filled'
              sx={{ "& .MuiInputBase-input.MuiFilledInput-input:-webkit-autofill": { boxShadow: "0 0 0 100px rgba(23, 20, 20, .98) inset" } }}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
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
                      {isPasswordVisible ? <VisibilityOff /> :
                        <Visibility />}
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
              {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Sign Up'}
            </Button>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="body1" color="white" bgcolor={"transparent"} >
                Already have an account?
              </Typography>
              <MyButton title="Login" variant="text" onClick={() => navigate('/login')} />

            </Box>

          </Stack>
        </form>
      </Stack>
    </AuthModule>
  );
}

export default Signup;

