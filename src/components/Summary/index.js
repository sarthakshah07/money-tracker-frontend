import { Box, Card, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '../../services/colors';
import { CurrencyRupee } from '@mui/icons-material';

const Summary = ({ data }) => {
    console.log("data", data);
    return (
        <Grid container spacing={2}>
            <Grid item xs={4} md={4}>
                <Card sx={{ p: 2 }}>
                    <Typography variant="h6">Total Income</Typography>
                    <Typography variant="h6" display="flex" alignItems="center" color={Colors.success}><CurrencyRupee />{data?.totalIncome}</Typography>
                </Card>
            </Grid>
            <Grid item xs={4} md={4}>
                <Card sx={{ p: 2 }}>
                    <Typography variant="h6">Total Expenses</Typography>
                    <Typography variant="h6" display="flex" alignItems="center" color={Colors.danger}><CurrencyRupee />{data?.totalExpenses}</Typography>
                </Card>
            </Grid>
            <Grid item xs={4} md={4}>
                <Card sx={{ p: 2 }}>
                    <Typography variant="h6">Net Balance</Typography>
                    <Typography variant="h6"display="flex" alignItems="center"><CurrencyRupee />{data?.balance}</Typography>
                </Card>
            </Grid>
        </Grid>



    );
};

export default Summary;
