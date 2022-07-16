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
        data: [
          arrOfProducts.filter((el) => el.isWasted === true).length,
          arrOfProducts.filter((el) => el.isEaten === true).length,
        ],

        backgroundColor: ['#f339', '#3f39'],
        borderColor: ['rgba(100, 00, 00)', 'rgba(70, 256, 70)'],
        borderWidth: 3,
      },
    ],
  };
  const doughnutChartoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 15,
          },
        },
      },
      title: {
        color: ['#fff'],
        display: true,
        text: 'Eat/Waste',
        font: {
          size: 20,
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        grid: { color: '#fff5', beginAtZero: true },
        ticks: { color: '#fff', beginAtZero: true },
      },
      x: {
        grid: { color: '#fff5', beginAtZero: true },
        ticks: { color: '#fff', beginAtZero: true },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 15,
          },
        },
      },
      title: {
        color: ['#fff'],
        display: true,
        text: 'Monthly',
        font: {
          size: 20,
        },
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
  const wastedGrouped = _.groupBy(wastedArr, ({ removeFromFridgeTime }) =>
    removeFromFridgeTime?.toDate().getMonth()
  );
  for (const key in wastedGrouped) {
    wastedGrouped[key] = wastedGrouped[key].length;
  }
  const orderedWasted = Object.keys(wastedGrouped)
    .sort()
    .reduce((obj, key) => {
      obj[key] = wastedGrouped[key];
      return obj;
    }, {});
  for (let key in orderedWasted) {
    orderedWasted[toMonthName(key)] = wastedGrouped[key];
    delete orderedWasted[key];
  }

  const eatenArr = arrOfProducts.filter((el) => el.isEaten === true);
  const eatenGrouped = _.groupBy(eatenArr, ({ removeFromFridgeTime }) =>
    removeFromFridgeTime?.toDate().getMonth()
  );
  for (const key in eatenGrouped) {
    eatenGrouped[key] = eatenGrouped[key].length;
  }

  const orderedEaten = Object.keys(eatenGrouped)
    .sort()
    .reduce((obj, key) => {
      obj[key] = eatenGrouped[key];
      return obj;
    }, {});
  for (let key in orderedEaten) {
    orderedEaten[toMonthName(key)] = eatenGrouped[key];
    delete orderedEaten[key];
  }

  const barChartData = {
    datasets: [
      {
        label: 'Wasted',
        data: orderedWasted,
        backgroundColor: '#f339',
        borderColor: 'rgba(100, 00, 00)',
        borderWidth: 2,
      },
      {
        label: 'Eaten',
        data: orderedEaten,
        backgroundColor: '#3f39',
        borderColor: 'rgba(70, 256, 70)',
        borderWidth: 2,
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
        onClick={() => setIsHidden((prev) => !prev)}
      >
        {isHidden ? 'Hide' : 'Show'} Charts
      </Button>
      {isHidden && (
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
        >
          <Box
            margin={5}
            maxHeight={400}
            maxWidth={400}
            height={'100%'}
            width={'100%'}
          >
            <Doughnut options={doughnutChartoptions} data={doughnutChartData} />
          </Box>
          <Box
            marginBottom={5}
            maxheight={300}
            minWidth={350}
            maxWidth={'90%'}
            width={'100%'}
          >
            <Bar options={barChartOptions} data={barChartData} />
          </Box>
        </Flex>
      )}
    </>
  );
};
