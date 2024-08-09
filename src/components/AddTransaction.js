import React, { useState, useCallback } from 'react';
import { Box, Container, Typography, Grid, Paper, Card, CardHeader, CardContent, Button, Modal, TextField, RadioGroup, Radio, FormControlLabel, Table, TableHead, TableRow, TableCell, TableBody, InputAdornment, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';
import Swal from 'sweetalert2';
import { removeUser } from '../services/token';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { Cancel, Circle, CurrencyRupee, MoreVert, Save } from '@mui/icons-material';
import { Colors } from '../services/colors';
import MyMenu from './myMenu';
import MyEditableTextField from './myEditableTextField';
import MyCalcTable from './myCalcTable/inde';
import MyButton from './myButton';
import { addTransactionAction } from '../redux/transaction/middleware';
import { authSelector } from '../redux/auth/authSlice';
import { useFormik } from "formik"
import { transactionSelector } from '../redux/transaction/transactionSlice';

function AddTransaction({ modalOpen, setModalOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { currentUser, userCategpories } = useSelector(authSelector);
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  // const [modalOpen, setModalOpen] = useState(false);
  console.log("userCategpories", userCategpories, currentUser.user.categories);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle adding transaction logic
    const data = {
      date: date,
      category: category,
      amount: amount,
      description: description,
      type: type,
      userId: currentUser?.user?._id,
    }

    dispatch(addTransactionAction(data)).then(({ payload }) => {
      if (payload.status === 200 || payload.status === 201) {
        enqueueSnackbar('Transaction added successfully', { variant: 'success' });
        setDate('');
        setCategory('');
        setAmount('');
        setDescription('');
        setType('income');
        setModalOpen(false);
      } else {
        enqueueSnackbar('Transaction added failed', { variant: 'error' });
      }
    })
    // setDate('');
    // setCategory('');
    // setAmount('');
    // setDescription('');
    // setType('income');
    // setModalOpen(false);
  };

  const handelReset = useCallback(() => {
    setDate('');
    setCategory('');
    setAmount('');
    setDescription('');
    setType('');
  })
  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);


  // console.log("isModal oPNE",is);
  return (

    <Modal open={modalOpen} onClose={handleModalClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', color: "black", background: Colors.primary, alignItems: 'center', p: '20px', boxShadow: `10px 10px 30px ${Colors.fillers}` }}>
        <Typography variant='h6' sx={{ mb: '10px', color: Colors.text }}>Add Transaction</Typography>
        <Box sx={{ borderRadius: 5, boxShadow: 10, p: 2, width: {xs:"80%", md: "40%"} }}>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Date"
                  value={date}
                  size='small'
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ disableUnderline: true }}

                  inputProps={{ max: new Date().toISOString().split('T')[0] }}
                  onChange={(e) => setDate(e.target.value)}
                  sx={{ mb: '10px', color: Colors.text, borderColor: Colors.text }}
                />

              </Grid>
              <Grid item xs={12} md={6}>
                <RadioGroup value={type} onChange={(e) => setType(e.target.value)} inline sx={{ display: "block", justifyContent: "space-evenly", color: Colors.text, marginBottom: 1 }}>
                  <FormControlLabel value="credit" sx={{ color: Colors.text }} required control={<Radio sx={{ color: Colors.text }} />} label="Credit" />
                  <FormControlLabel value="debit" sx={{ color: Colors.text }} required control={<Radio sx={{ color: Colors.text }} />} label="Debit" />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <InputLabel id="category-label" sx={{ color: Colors.text }}>Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ mb: '10px', color: Colors.text, borderColor: Colors.text }}
                  >
                    {currentUser.user.categories?.map((item, index) => {
                      if (index === 0) return null 
                      return (
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                      )
                    })}
                    <MenuItem value={currentUser.user.categories[0]}>{currentUser.user.categories[0]}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Amount" required size='small' value={amount} disabled={!type} fullWidth onChange={(e) => setAmount(!isNaN(e.target.value) ? e.target.value : amount)} sx={{ mb: '20px', borderColor: Colors.text }}
                  InputProps={{ startAdornment: <InputAdornment position="start"><CurrencyRupee sx={{ color: Colors.text }} /></InputAdornment>, style: { color: type === "credit" ? "green" : "red" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Details " size='small' fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} sx={{ mb: '20px', color: "black", borderColor: "black" }} inputProps={{ color: "black" }} />
              </Grid>
              <Grid item xs={12} display={"flex"} >
                <MyButton
                  startIcon={
                    <Save />
                  }
                  type="submit"
                  variant='outlined'
                  title="Save"
                />
                <MyButton
                  variant='text'
                  title="Reset"
                  onClick={handelReset}
                  sx={{ marginLeft: 1 }}
                />
                <MyButton
                  startIcon={
                    <Cancel />
                  }
                  variant='outlined'
                  title="Cancel"
                  onClick={handleModalClose}
                  sx={{ marginLeft: 1, float: "right" }}
                />
              </Grid>
            </Grid>






            {/* <Button type="submit" variant="outlined" sx={{ mr: '10px' }}>Save</Button> */}
          </form>
        </Box>

      </Box>
    </Modal>
  );
}

export default AddTransaction;

