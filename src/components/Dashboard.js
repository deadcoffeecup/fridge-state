import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { Button, Box, Container, Text, Flex } from '@chakra-ui/react';

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';
import { AddByPhoto } from './AddByPhoto';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const productsColRef = collection(db, 'users', currentUser.uid, 'products');
  const q = query(productsColRef, where('isEaten' || 'isWasted', '==', false));

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

  const handleAdd = (product) => {
    addDoc(productsColRef, product);
  };
  const handleFlag = (product, mode) => {
    setDoc(doc(db, 'users', currentUser.uid, 'products', product.id), {
      ...product,
      [mode]: true,
      removeFromFridgeTime: Timestamp.fromDate(new Date()),
    });
  };

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
      minHeight={'calc(100vh)'}
      bg={'gray.700'}
    >
      <Container>
        <AddByPhoto />
        <Flex
          flexDirection={'column'}
          flex={1}
          justifyContent={'flex-end'}
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
            onClick={() => navigate('/statistics', { replace: true })}
          >
            Statistics
          </Button>
        </Flex>

        <AddForm handleAdd={handleAdd} />

        {/* <ProductsList handleFlag={handleFlag} products={products} /> */}
      </Container>
    </Box>
  );
};
