import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
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

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

export const Statistics = () => {
  const [products, setProducts] = useState([]);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const arrOfProducts = Object.values(products);

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
      width={'calc(100vw)'}
      minHeight={'min-content'}
      height={'calc(100vh)'}
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
          <Flex flexDirection={'row'}>
            <Text>Hello {currentUser.displayName || 'friend'}</Text>
            <Button colorScheme={'teal'} size={'xs'} onClick={handleLogout}>
              Log out
            </Button>
          </Flex>
          <Button
            colorScheme={'teal'}
            size={'xs'}
            onClick={() => navigate('/', { replace: true })}
          >
            Back
          </Button>
        </Flex>

        <Container>
          <Heading>Statistics</Heading>
          <Accordion
            border='2px'
            borderColor='teal.300'
            borderRadius={'xl'}
            allowMultiple
          >
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
                      {product.isEaten && <Box color={'green.400'}>eaten</Box>}
                      {product.isWasted && <Box color={'red.400'}>wasted</Box>}
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
      </Container>
    </Box>
  );
};
