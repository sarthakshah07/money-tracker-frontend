// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
// import { Grid } from '@mui/material';
// import { formatDate } from '../../utils/utils';

// // Register the required components
// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// const Chart = ({ data }) => {
//   // console.log("data", data.labels);
//   const chartData = {
//     labels: formatDate(data.labels),
//     datasets: [
//       {
//         label: 'Expenses',
//         data: data.expenses,
//         fill: false,
//         borderColor: 'red',
//       },
//       {
//         label: 'Income',
//         data: data.income,
//         fill: false,
//         borderColor: 'green',
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: 'category',
//       },
//     },
//   };

//   return (
//     <Grid container maxHeight={"20dvh"}> 
//       <Line data={chartData} options={options} style={{ height: '100%',width: '100%' }} />
//     </Grid>
//   );
// };

// export default Chart;


import React, { Component } from 'react'
import ReactApexChart from "react-apexcharts";
import { formatDate } from '../../utils/utils';
import { Colors } from '../../services/colors';

const Chart = ({ data }) => {
  const options = {
    chart: {
      id: "area-chart-filled",
      type: 'area',
      height: 350
    },
    stroke: {
      curve: 'straight'
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.1,
        opacityTo: 0.05,
        stops: [0, 100]
      }
    },
    colors: [Colors.danger, Colors.success],
    yaxis: {
      labels: {
        style: {
          colors: Colors.text
        }
      }
    },
    xaxis: {
      categories: data?.labels.map((date) => formatDate(date)) || [],
      labels: {
        style: {
          colors: Colors.text
        }
      },
    }
  };

  const series = [
    {
      name: 'Expenses',
      data: data.expenses || 0
    },
    {
      name: 'Income',
      data: data.income || 0
    },
   
  ];

  return (
    <ReactApexChart options={options} series={series} type="area" height={350} />
  )
};

export default Chart;
