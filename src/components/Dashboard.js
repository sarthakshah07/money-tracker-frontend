import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardHeader, CardContent, Button, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WrapperComponent from './wrapperComponent';
import Chart from 'react-apexcharts';
import { Circle, CurrencyRupee } from '@mui/icons-material';
import { Colors } from '../services/colors';
import { transactionSelector } from '../redux/transaction/transactionSlice';
import { getAllTransactionAction } from '../redux/transaction/middleware';
import { formatDate, transactionTypeColor } from '../utils/utils';
import { getAllReportsAction } from '../redux/reports/middleware';
import { reportsSelector } from '../redux/reports/reportsSlice';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Dashboard() {
  const { transactionData } = useSelector(transactionSelector)
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reportsData } = useSelector(reportsSelector);
  const [chartSeries, setChartSeries] = useState([0, 0, 0]);
  useEffect(() => {
    dispatch(getAllReportsAction());
  }, []);
  useGSAP(() => {
    gsap.fromTo(
      ".Dashboard",
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
      gsap.to(".Dashboard", {
        opacity: 0,
        x: -100,
        duration: 1
      });
    };
  });
  const options = {
    chart: {
      type: 'polarArea',
      fontFamily: 'Poppins, sans-serif',
      height: 350,
      toolbar: {
        show: false,
      },
      background: '#333',
      width: 350,
      dropShadow: {
        enabled: true,
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
    },
    labels: [`Income: ${reportsData?.summary?.totalIncome || 0}`, `Expenses:${reportsData?.summary?.totalExpenses || 0}`, `Net Balance: ${reportsData?.summary?.balance || 0}`],
    colors: [Colors.success, Colors.danger, reportsData?.summary?.balance < 0 ? "#880808" : '#ffd400'],
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      // offsetX: 40,

      labels: {
        colors: '#fff',
      },
    },
  };


  // const series = [44, 55, 57];
  useEffect(() => {
    dispatch(getAllTransactionAction())
  }, [])
  useEffect(() => {
    if (reportsData?.summary?.totalIncome && reportsData?.summary?.totalExpenses && reportsData?.summary?.balance) {
      console.log("reportsData", typeof reportsData.summary?.totalIncome, reportsData.summary?.totalIncome, typeof reportsData.summary?.totalExpenses, reportsData.summary?.totalExpenses, typeof reportsData.summary?.balance, reportsData.summary?.balance);

      setChartSeries([reportsData?.summary?.totalIncome, reportsData.summary?.totalExpenses, reportsData.summary?.balance]);
    }
  }, [reportsData])

  if (!transactionData && !reportsData) {
    return <div>Loading...</div>;
  }
  return (
    <WrapperComponent>
      {/* <Calendar/> */}
      {/* <Container sx={{ padding: '20px', height: '100dvh' }}> */}

      <Grid container spacing={1} p={isMobile ? 1 : 5} mb={isMobile ? 10 : "auto"}
      // sx={{height: "fit-content" }}
     
      >
        <Grid item xs={12} bgcolor={Colors.primary}>
          <Typography variant='h4' sx={{ color: '#fff', marginBottom: '20px' }}>
            Dashboard
          </Typography>

        </Grid>

        {transactionData ?
          <>
            {(transactionData.length > 0 && chartSeries && chartSeries.length > 0) &&
              <Grid item xs={12} md={6} lg={5} bgcolor={Colors.primary}  className='Dashboard' display="flex" justifyContent="center" alignItems="center">
                {/* <Paper
                  sx={{
                    // padding: '20px',
                  }}
                > */}
                {chartSeries && <Chart options={options} series={chartSeries} type="polarArea" width={isMobile ? "100%" : 350} height={isMobile ? 250 : 400} />}
                {/* </Paper> */}
              </Grid>
            }
            <Grid item xs={12} md={6} lg={7} bgcolor={Colors.primary}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  // height: '100%',
                  // padding: '20px',
                  // background: '#444',
                  p:2,
                  color: '#fff',
                }}
              >
                {transactionData && <Typography variant='h5'>Recent Transactions</Typography>}
                <Grid container spacing={2}   >
                  {transactionData?.length > 0 ? <>
                    {transactionData?.slice(0, 6)?.map((item, index) => (
                      <Grid item xs={6}>
                        <Card className='Dashboard'>
                          <CardHeader

                            subheader={formatDate(item.date)}
                          />
                          <CardContent sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                            {/* <div
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            marginRight: '10px',
                          }}
                        /> */}
                            <Circle sx={{ color: item?.type === 'credit' ? 'green' : 'red', mr: 1 }} fontSize='10px' />
                            <Typography variant='body2' sx={{ flexGrow: 1, textTransform: 'capitalize' }} >{item?.type}<span style={{ float: 'right', display: 'flex', alignItems: 'center', color: transactionTypeColor(item?.type) }}> <CurrencyRupee /> {item.amount}</span></Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    ))}
                    <Grid item xs={12} display={'flex'} justifyContent='flex-end' >
                      <Button variant='text' sx={{ color: 'goldenrod' }} onClick={() => navigate('/transactions')}>View All</Button>
                    </Grid>
                  </> : <Typography variant='h6' sx={{ color: '#fff', width: '100%', marginTop: '20px' }} textAlign={'center'}>No Data Found</Typography>}

                </Grid>

              </Box>
            </Grid>
          </>
          : <Typography variant='h6' sx={{ color: '#fff', width: '100%' }} textAlign={'center'}>No Data Found</Typography>}

      </Grid>


      {/* </Container> */}
    </WrapperComponent>
  );
}

export default Dashboard;

