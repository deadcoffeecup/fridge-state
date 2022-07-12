import React, { useState } from 'react';
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
import { Box, Button, Flex } from '@chakra-ui/react';

export const Charts = ({ arrOfProducts }) => {
  const [isHidden, setIsHidden] = useState(true);
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
  const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  };

  const wastedArr = arrOfProducts.filter((el) => el.isWasted === true);
  const wastedGrouped = _.groupBy(wastedArr, ({ expireDate }) =>
    expireDate.toDate().getMonth()
  );
  for (const key in wastedGrouped) {
    wastedGrouped[key] = wastedGrouped[key].length;
  }
  for (let key in wastedGrouped) {
    wastedGrouped[toMonthName(key)] = wastedGrouped[key];
    delete wastedGrouped[key];
  }

  const eatenArr = arrOfProducts.filter((el) => el.isEaten === true);
  const eatenGrouped = _.groupBy(eatenArr, ({ expireDate }) =>
    expireDate.toDate().getMonth()
  );
  for (const key in eatenGrouped) {
    eatenGrouped[key] = eatenGrouped[key].length;
  }
  for (let key in eatenGrouped) {
    eatenGrouped[toMonthName(key)] = eatenGrouped[key];
    delete eatenGrouped[key];
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
      <Button
        marginBottom={5}
        marginLeft={1}
        colorScheme={'teal'}
        size={'md'}
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? 'Hide' : 'Show'} Charts
      </Button>
      {isHidden && (
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box margin={5} height={300} width={300}>
            <Doughnut options={{ responsive: true }} data={doughnutChartData} />
          </Box>
          <Box
            marginBottom={40}
            height={300}
            maxWidth={800}
            width={'calc(95vw)'}
          >
            <Bar options={barChartOptions} data={barChartData} />
          </Box>
        </Flex>
      )}
    </>
  );
};
