import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query } from 'firebase/firestore';
import {
  Button,
  Box,
  Container,
  Text,
  Accordion,
  AccordionItem,
  Flex,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
} from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

export const Statistics = () => {
  const [products, setProducts] = useState([]);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const arrOfProducts = Object.values(products);
  ChartJS.register(ArcElement, Tooltip, Legend);

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

  const productsColRef = collection(db, 'users', currentUser.uid, 'products');
  const q = query(productsColRef);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const productsArr = [];
        snapshot.docs.forEach((doc) => {
          productsArr.push({ ...doc.data(), id: doc.id });
          setProducts([
            ...productsArr.filter(
              (el) => el.isEaten === true || el.isWasted === true
            ),
          ]);
        });
      }
    );

    return unsubscribe;
  }, [q]);

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      console.log('failed to logout');
    }
  }

  return (
    <Box
      color={'white'}
      width={'100%'}
      minHeight={'calc(100vh)'}
      height={'100%'}
      bg={'gray.700'}
    >
      <Container>
        <Flex
          flex={1}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'flex-end'}
          textAlign={'right'}
          marginBottom={'10'}
        >
          <Flex alignItems={'center'} flexDirection={'row'}>
            <Text as={Box}>Hello {currentUser.displayName || 'friend'}</Text>
            <Button
              marginTop={1}
              marginLeft={1}
              colorScheme={'teal'}
              size={'xs'}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Flex>
          <Button
            marginTop={1}
            colorScheme={'teal'}
            size={'xs'}
            onClick={() => navigate('/', { replace: true })}
          >
            {'<- Back'}
          </Button>
        </Flex>{' '}
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box margin={5} height={300} width={300}>
            <Doughnut data={doughnutChartData} />
          </Box>
          <Container>
            <Accordion
              border='2px'
              borderColor='teal.300'
              borderRadius={'xl'}
              allowMultiple
            >
              <Heading textAlign={'center'}>Statistics</Heading>

              {arrOfProducts?.map((product) => (
                <AccordionItem borderRadius={'xl'} key={product.id}>
                  <Heading>
                    <AccordionButton>
                      <Flex
                        justifyContent={'space-between'}
                        flex='1'
                        textAlign='left'
                      >
                        <Box>{product.name}</Box>
                        {product.isEaten && (
                          <Box color={'green.400'}>eaten</Box>
                        )}
                        {product.isWasted && (
                          <Box color={'red.400'}>wasted</Box>
                        )}
                      </Flex>
                      <AccordionIcon />
                    </AccordionButton>
                  </Heading>
                  <AccordionPanel>
                    {product.isEaten && (
                      <Box>
                        Eaten:{' '}
                        {product.removeFromFridgeTime &&
                          product.removeFromFridgeTime.toDate().toDateString()}
                      </Box>
                    )}
                    {product.isWasted && (
                      <Box>
                        Wasted:{' '}
                        {product.removeFromFridgeTime &&
                          product.removeFromFridgeTime.toDate().toDateString()}
                      </Box>
                    )}
                    <Box flex='1' textAlign='left'>
                      Expired:{`  `}
                      {product.expireDate &&
                        product.expireDate.toDate().toDateString()}
                    </Box>
                    <Box>{product.category}</Box>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Flex>
      </Container>
    </Box>
  );
};
