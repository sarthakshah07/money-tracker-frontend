import React, { useCallback, useEffect, useState } from 'react';
import WrapperComponent from './wrapperComponent';
import { Box, Container, Button, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Modal, useMediaQuery, TableContainer, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import { Colors } from '../services/colors';
import MyEditableTextField from './myEditableTextField';
import { Add, CancelOutlined, CircleRounded, Delete, Info, KeyboardArrowDown, More, MoreHoriz, PlusOneOutlined } from '@mui/icons-material';
import { enqueueSnackbar } from "notistack"
import AddTransaction from './AddTransaction';
import MyButton from './myButton';
import { useDispatch, useSelector } from 'react-redux';
import { deletedTransactionAction, getAllTransactionAction, updateTransactionAction } from '../redux/transaction/middleware';
import { transactionSelector } from '../redux/transaction/transactionSlice';
import { authSelector } from '../redux/auth/authSlice';
import { formatDate, transactionTypeColor } from '../utils/utils';
import TransactionCard from './TransactionCard';
import Swal from 'sweetalert2';
import { FallingLines } from "react-loader-spinner"
import MyDateInput from './MyDateInput';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

function Transactions() {
  const isBigScreen = useMediaQuery("(min-width: 1200px)");
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector)
  const [pageNumber, setPageNumber] = useState(1);
  const { transactionData } = useSelector(transactionSelector)
  const [isRowEditable, setIsRowEditable] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setIsFilter] = useState("All")
  const [transactions, setTransactions] = useState([]);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  // const monthsData = [
  //   { month: 'All', year: '' },
  //   ...Array.from({ length: 12 - currentMonth }, (_, i) => {
  //     const month = new Date(currentYear, currentMonth + i + 1, 1)
  //       .toLocaleString('default', { month: 'short' });
  //     const year = currentYear;
  //     return { month, year };
  //   }).concat(Array.from({ length: currentYear - 2021 }, (_, i) => {
  //     const month = '12';
  //     const year = (2021 + i).toString();
  //     return { month, year };
  //   }))
  // ];
  const monthsData = [
    { month: 'All', year: '' },
    ...Array.from({ length: 12 }, (_, i) => {
      const month = new Date(currentYear, i, 1)
        .toLocaleString('default', { month: 'short' });
      const year = currentYear;
      return { month, year };
    }).slice(0, currentMonth + 1).concat(Array.from({ length: currentYear - 2021 }, (_, i) => {
      const month = '12';
      const year = (2021 + i).toString();
      return { month, year };
    }))
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".transactionContainer",
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
      gsap.to(".transactionContainer", {
        opacity: 0,
        x: -100,
        duration: 1
      });
    };
  });
  // const monthsData = Array.from({ length: 12 - currentMonth }, (_, i) => {
  //   const month = new Date(currentYear, currentMonth + i + 1, 1)
  //     .toLocaleString('default', { month: 'short' });
  //   const year = currentYear;
  //   return { month, year };
  // }).concat(Array.from({ length: currentYear - 2021 }, (_, i) => {
  //   const month = '12';
  //   const year = (2021 + i).toString();
  //   return { month, year };
  // }));
  const handleDeleteRow = (id) => {
    console.log("iddddd delteee", id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletedTransactionAction(id)).then(({ payload }) => {
          if (payload.status === 200 || payload.status === 201) {
            enqueueSnackbar('Transaction deleted successfully', { variant: 'success' });
          }
          else {
            enqueueSnackbar('Transaction deleted failed', { variant: 'error' });
          }
        })
      }
    })
  }
  const handleEditRow = (e) => {
    e.preventDefault();
    const updatedTransactions = transactions?.find((transaction) => transaction._id === isRowEditable._id);
    console.log("edit transtaion ", isRowEditable, updatedTransactions);
    if (updatedTransactions) {
      dispatch(updateTransactionAction(updatedTransactions)).then(({ payload }) => {
        if (payload.status === 200 || payload.status === 201) {
          enqueueSnackbar('Transaction edited successfully', { variant: 'success' });
          setIsRowEditable(null)
        }
        else {
          enqueueSnackbar('Transaction edited failed', { variant: 'error' });
        }
      })
    }
    // setIsRowEditable(null)
  }
  const handleChangePage = (event, value) => {
    setPageNumber(value);
  };

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, [])
  useEffect(() => {
    if (transactionData) {
      if (filter === "All") {
        return setTransactions(transactionData);
      }
      const filteredTransactions = transactionData.filter(transaction => new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(transaction.date)) === filter)
      console.log("filteredTransactions", filteredTransactions);
      const newPageNumber = isBigScreen ? 8 : 5
      const startIndex = (pageNumber - 1) * newPageNumber;
      const endIndex = pageNumber * newPageNumber;
      const currentPageTransactions = filteredTransactions.slice(startIndex, endIndex);


      setTransactions(currentPageTransactions);
    }
  }, [transactionData, pageNumber, isBigScreen, filter])

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }
    , [])
  return (
    <WrapperComponent>
      <Container sx={{ padding: '20px' }}>
        <Typography variant='h4' sx={{ color: '#fff', marginBottom: '20px' }}>
          Transactions
        </Typography>
        <Grid container spacing={1} bgcolor={Colors.primary} p={2} sx={{ maxHeight: '90dvh', overflowY: "auto" }}>

          <Grid item xs={12}
          className='transactionContainer'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
              width: '100%',
              // padding: '20px',
              // background: '#444',
              color: '#fff',
            }}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={isBigScreen ? "row" : "column"}
              gap={isBigScreen ? "10px" : "10px"}
            >
              <Typography variant='h5'>Recent Transactions</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <FormControl
                  variant="outlined"
                  size='small'

                  sx={{
                    minWidth: '100px',
                    color: Colors.fillers
                  }}
                >
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    value={filter}
                    label="Filter"
                    size='small'
                    onChange={(e) => setIsFilter(e.target.value)}
                    sx={{
                      color: Colors.fillers,

                      "& .MuiSelect-icon": {
                        color: Colors.fillers
                      }
                    }}
                  >
                    {monthsData.map((month, index) =>
                      <MenuItem key={index} value={month.month} >{month.month} {month.year && `, ${month.year}`}</MenuItem>)}
                    {/* <MenuItem value="all">All</MenuItem>
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem> */}
                  </Select>
                </FormControl>
                <MyButton
                  startIcon={
                    <Add />
                  }
                  variant='outlined'
                  title="Add New"
                  sx={{
                    color: Colors.fillers,
                    borderColor: Colors.fillers
                  }}
                  onClick={() => setModalOpen(true)}
                />
              </Box>




            </Box>

            {transactions?.length > 0 ? (
              // <Grid container >{
              //   isBigScreen ?
              <TableContainer

              // sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column',
              //  width: { xs: "min-content", md: "100%" } }}
              >
                {isLoading ? <Grid container justifyContent={"center"}><FallingLines
                  color="#4fa94d"
                  width="100"
                  visible={true}
                  ariaLabel="falling-circles-loading"
                /> </Grid>:
                  <>
                    <Table size='small' >
                      <TableHead>
                        <TableRow>
                          <TableCell align='left'></TableCell>
                          <TableCell align='left'>Date</TableCell>
                          <TableCell align='left'>Category</TableCell>
                          <TableCell align='left'>Amount</TableCell>
                          <TableCell align='left'>Description</TableCell>
                          <TableCell align='right'>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {transactions.map((transaction, index) => (
                          <TableRow key={index}>
                            <TableCell align='center' sx={{ minWidth: '5px', maxWidth: '5px' }}><CircleRounded fontSize='20px' sx={{ color: transactionTypeColor(transaction?.type) }} /></TableCell>
                            <TableCell>
                              {Boolean(isRowEditable) && isRowEditable._id === transaction._id ?
                                <MyDateInput value={transaction.date}
                                  onChange={(date) => {
                                    const updatedTransactions = [...transactions];
                                    updatedTransactions[index] = { ...updatedTransactions[index], date: date };
                                    setTransactions(updatedTransactions);
                                  }} />
                                // <MyEditableTextField
                                //   type="date"
                                //   value={new Date(transaction.date).toDateString()}
                                //   flag={Boolean(isRowEditable) && isRowEditable._id === transaction._id}
                                //   onChange={(e) => {
                                //     const updatedTransactions = [...transactions];
                                //     updatedTransactions[index] = { ...updatedTransactions[index], date: e.target.value };
                                //     setTransactions(updatedTransactions);
                                //   }}
                                //   defaultValue={formatDate(transaction.date)}
                                // />
                                : <Typography variant='body2' >{formatDate(transaction.date)}</Typography>}
                            </TableCell>
                            <TableCell >

                              <Select
                                labelId="category-label"
                                id="category"
                                fullWidth
                                size='small'
                                disabled={isRowEditable?._id !== transaction?._id}
                                value={transaction.category}
                                IconComponent={() => isRowEditable && isRowEditable._id === transaction._id ? <KeyboardArrowDown /> : null}

                                label=""
                                onChange={(e) => {
                                  let updatedTransactions = [...transactions];
                                  updatedTransactions[index] = { ...updatedTransactions[index], category: e.target.value };
                                  setTransactions(updatedTransactions);
                                }}
                                sx={{
                                  color: Colors.text, border: "none", outline: "none",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    border: isRowEditable?._id === transaction?._id ? "1px solid grey !important" : "none !important",

                                  }
                                }}
                              >
                                {currentUser.user.categories?.map((category, index) => (

                                  <MenuItem key={index} value={category}>{category}</MenuItem>
                                ))}

                              </Select>

                              {/* <MyEditableTextField
                            value={transaction.category}
                            flag={Boolean(isRowEditable) && isRowEditable._id === transaction._id}
                            onChange={(e) => {
                              let updatedTransactions = [...transactions];
                              updatedTransactions[index] = { ...updatedTransactions[index], category: e.target.value };
                              setTransactions(updatedTransactions);
                            }}
                          /> */}
                            </TableCell>
                            <TableCell sx={{ maxWidth: "80px" }}>
                              <MyEditableTextField
                                value={transaction.amount}
                                flag={Boolean(isRowEditable) && isRowEditable._id === transaction._id}
                                onChange={(e) => {
                                  const updatedTransactions = [...transactions];
                                  updatedTransactions[index] = { ...updatedTransactions[index], amount: parseFloat(e.target.value) };
                                  setTransactions(updatedTransactions);
                                }}
                                transactionType={transaction?.type}
                                type="number"

                              />
                            </TableCell>
                            <TableCell sx={{ minWidth: "200px" }}>
                              <MyEditableTextField
                                value={transaction.description}
                                flag={Boolean(isRowEditable) && isRowEditable._id === transaction._id}
                                onChange={(e) => {
                                  const updatedTransactions = [...transactions];
                                  updatedTransactions[index] = { ...updatedTransactions[index], description: e.target.value };
                                  setTransactions(updatedTransactions);
                                }}
                                multiline
                              />
                              {/* {transaction.description.length > 20 ? <Info fontSize='small' sx={{ color: Colors.fillers, translate: "0px 10px", cursor: "pointer" }} onClick={() => enqueueSnackbar(transaction.description, { variant: 'info' })} /> : null} */}
                            </TableCell>
                            <TableCell sx={{ display: "flex", alignItems: "center", justifyContent: "right", gap: "10px" }} >
                              {Boolean(isRowEditable) && isRowEditable._id === transaction._id ? (
                                <CancelOutlined
                                  // variant="outlined"
                                  // size="small"
                                  // title={"cancel"}
                                  sx={{ color: Colors.danger, cursor: "pointer" }}
                                  onClick={() => setIsRowEditable(null)}
                                />
                              ) : (
                                <></>
                              )}
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={(e) => {
                                  if (Boolean(isRowEditable) && isRowEditable._id === transaction._id) {
                                    handleEditRow(e)
                                  } else {
                                    setIsRowEditable(transaction)
                                  }
                                }}
                                sx={{
                                  color: Boolean(isRowEditable) && isRowEditable._id === transaction._id ? "green" : Colors.fillers,
                                  borderColor: Boolean(isRowEditable) && isRowEditable._id === transaction._id ? "green" : Colors.fillers
                                }}
                              >
                                {Boolean(isRowEditable) && isRowEditable._id === transaction._id ? "Save" : "Edit"}
                              </Button>

                              <IconButton onClick={() => handleDeleteRow(transaction._id)}>
                                <Delete sx={{ color: Colors.danger }} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                  </>
                }
              </TableContainer>

              // : transactionData.map((item ,index)=>(
              //   <TransactionCard key={index} transaction={item} />
              // ))}
              // </Grid>
            ) : (
              <Typography variant='h6' textAlign={"center"}>No Transaction Found</Typography>
            )}
            {transactionData?.length > 10 &&
              <Box display={"flex"} justifyContent={"flex-end"} width={"100%"}>
                <Pagination count={Math.ceil(transactionData.length / 10)} page={pageNumber} onChange={handleChangePage} sx={{ float: "right" }} />
              </Box>
            }
          </Grid>
        </Grid>
      </Container>
      {/* <Moda */}
      <AddTransaction modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </WrapperComponent>
  );
}

export default Transactions;
