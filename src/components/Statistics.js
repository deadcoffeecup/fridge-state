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
  const q = query(productsColRef, where('isEaten' || 'isWasted', '==', true));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const productsArr = [];
        snapshot.docs.forEach((doc) => {
          productsArr.push({ ...doc.data(), id: doc.id });
          setProducts([...productsArr]);
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
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel>
                  <Box flex='1' textAlign='left'>
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
