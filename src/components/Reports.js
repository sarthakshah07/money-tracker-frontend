import React, { useEffect } from 'react';
import WrapperComponent from './wrapperComponent';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Colors } from '../services/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReportsAction } from '../redux/reports/middleware';
import { reportsSelector } from '../redux/reports/reportsSlice';
import Summary from './Summary';
import CommonChart from './CommonChart';

const Reports = () => {
  const dispatch = useDispatch();
  const { reportsData } = useSelector(reportsSelector);
  console.log("reportsData", reportsData);
  useEffect(() => {
    dispatch(getAllReportsAction());
  }, []);
  return (
    <WrapperComponent>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" color={Colors.text} gutterBottom>
          Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              {reportsData?.summary ? <Summary data={reportsData.summary} /> : <>No Data Found</>}
            </Paper>

          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              {reportsData?.chartData ? <CommonChart data={reportsData.chartData} /> : <>No Data Found</>}
            </Paper>
          </Grid>

        </Grid>
      </Box>
    </WrapperComponent>
  );
};

export default Reports;

