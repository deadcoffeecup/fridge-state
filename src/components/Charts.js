import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';

export const Charts = ({ arrOfProducts }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const doughnutChartData = {
    labels: ['Wasted', 'Eaten'],
    datasets: [
      {
        label: 'DUPA',
        data: [
          arrOfProducts.filter((el) => el.isWasted === true).length,
          arrOfProducts.filter((el) => el.isEaten === true).length,
        ],
        backgroundColor: ['#f00', '#0f0'],
        borderColor: ['rgba(100, 00, 00)', 'rgba(70, 256, 70)'],
        borderWidth: 3,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Monthly',
      },
    },
  };

  const wastedArr = arrOfProducts.filter((el) => el.isWasted === true);

  const wastedGrouped = _.groupBy(wastedArr, ({ expireDate }) =>
    expireDate.toDate().getMonth()
  );
  for (const key in wastedGrouped) {
    wastedGrouped[key] = wastedGrouped[key].length;
  }

  const eatenArr = arrOfProducts.filter((el) => el.isEaten === true);

  const eatenGrouped = _.groupBy(eatenArr, ({ expireDate }) =>
    expireDate.toDate().getMonth()
  );
  for (const key in eatenGrouped) {
    eatenGrouped[key] = eatenGrouped[key].length;
  }
  const barChartData = {
    datasets: [
      {
        label: 'Wasted',
        data: wastedGrouped,
        backgroundColor: '#f00',
      },
      {
        label: 'Eaten',
        data: eatenGrouped,
        backgroundColor: '#0f0',
      },
    ],
  };

  return (
    <>
      <Box margin={5} height={300} width={300}>
        <Doughnut options={{ responsive: true }} data={doughnutChartData} />
      </Box>
      <Box margin={0} height={300} width={500}>
        <Bar options={barChartOptions} data={barChartData} />
      </Box>
    </>
  );
};
