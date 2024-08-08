import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button, FormControlLabel, Checkbox, Select, MenuItem, TextField, IconButton, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import WrapperComponent from './wrapperComponent';
import { Colors } from '../services/colors';
import { Add, Cancel, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/auth/authSlice';
import { updateUserAction } from '../redux/auth/middleware';
import { enqueueSnackbar } from 'notistack';
import MyButton from './myButton';

function Settings() {
  const { currentUser } = useSelector(authSelector)
  console.log("currentUser", currentUser);
  const [user, setUser] = useState({ name: currentUser?.user?.name, email: currentUser?.user?.email, categories: currentUser?.user?.categories });
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);
  const isDisabled = false;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleUserChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const checkInputChange = () => {
    const temp = { ...currentUser?.user };
    delete temp.password;
    delete temp.__v;
    delete temp._id;
   if (JSON.stringify(user) !== JSON.stringify(temp)) {
      return true
    }
    return false
  }
  const handleUserSave = () => {
    const newUser = {
      userId: currentUser?.user?._id,
      name: user?.name,
      email: user?.email,
      categories: user?.categories
    }
    dispatch(updateUserAction(newUser)).then(({ payload }) => {
      if (payload.status === 200 || payload.status === 201) {
        enqueueSnackbar('User updated successfully', { variant: 'success' });

      }
    })
  }
  return (
    <WrapperComponent>
      {/* <Container
        sx={{
          // display: 'flex',
          // flexDirection: isMobile ? 'column' : 'row',
          // padding: theme.spacing(2),
          // backgroundColor: theme.palette.background.default,
          // color: theme.palette.text.primary,
          height: '100',

        }}
      > */}
        <Paper
          sx={{
            flex: 1,
            padding: theme.spacing(2),
            margin: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            // height: '100%',
            marginBottom: 6
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography variant="h6" gutterBottom>
                User Profile
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled={isDisabled}
                size='small'
                label="Name"
                name="name"
                value={user?.name}
                onChange={handleUserChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                disabled={isDisabled}
                size='small'
                name="email"
                value={user?.email}
                onChange={handleUserChange}
                fullWidth
              />

            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom>
                Currency Settings
              </Typography>
              <Select
                value={currency}
                size='small'
                disabled={isDisabled}
                onChange={(event) => setCurrency(event.target.value)}
                fullWidth
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD" disabled>USD</MenuItem>
                {/* <MenuItem value="GBP" disabled>GBP</MenuItem> */}
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" gutterBottom>
                Categories Settings
              </Typography>
              <Grid container spacing={1}>
                {user?.categories?.map((category, index) => (
                    <Grid item xs={11} sm={4} md={3}>
                      <TextField
                        label={`Category ${index===0 ? "" : index}`}
                        disabled={isDisabled || index===0}
                        name="category"
                        value={category}
                        key={index}
                        size="small"
                        onChange={(event) => {
                          const updatedCategories = [...user.categories];
                          updatedCategories[index] = event.target.value;
                          setUser((prevUser) => ({
                            ...prevUser,
                            categories: updatedCategories,
                          }));
                        }}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {index!==0 ?
                              <IconButton
                                onClick={() => {
                                  const updatedCategories = [...user.categories];
                                  updatedCategories.splice(index, 1);
                                  setUser((prevUser) => ({
                                    ...prevUser,
                                    categories: updatedCategories,
                                  }));
                                }}
                              >
                                <Cancel />
                              </IconButton>
                              :null}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                ))}
                <Grid item  xs={11} sm={4} md={3}display={"flex"} justifyContent={"center"}  alignItems={"center"}>
                  <MyButton
                    onClick={() => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        categories: [...prevUser.categories, ""],
                      }));
                    }}
                    title="Add Category"
                    startIcon={<Add />}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Notification Settings
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={notifications} onChange={(event) => setNotifications(event.target.checked)} />}
              label="Enable Notifications"
            />
          </Grid> */}
            <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
              <Button
                startIcon={
                  <Save />
                }
                disabled={!checkInputChange()}
                variant='outlined'
                sx={{
                  color: Colors.fillers,
                  borderColor: Colors.fillers,

                }}
                onClick={handleUserSave}
              >Save</Button>
            </Grid>
          </Grid>
        </Paper>
      {/* </Container> */}
    </WrapperComponent>
  );
}

export default Settings;
