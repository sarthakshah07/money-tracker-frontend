

import React from 'react';
import { Box, Container, Grid, Paper, Card, CardHeader, CardContent, Button, TextField } from '@mui/material';
import MyEditableTextField from '../myEditableTextField';

const TransactionCard = ({ transaction }) => {
  return (
    <Grid item xs={6} sm={6} md={4}>
      <Card  sx={{border:1,m:1}}>
        <CardHeader
          title={<MyEditableTextField value={transaction.category} />}
          subheader={<MyEditableTextField value={transaction.amount} />}
        />
        <CardContent>
          <MyEditableTextField value={transaction.description} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TransactionCard;
