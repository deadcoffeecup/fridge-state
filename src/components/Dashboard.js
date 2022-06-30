import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Button, Box, Container, Text } from '@chakra-ui/react';

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const productsColRef = collection(db, 'users', currentUser.uid, 'products');
  const q = query(productsColRef, where('isEaten', '==', false));

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
  const handleEatFlag = (product) => {
    setDoc(doc(db, 'users', currentUser.uid, 'products', product.id), {
      ...product,
      isEaten: true,
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
      height={'calc(100vh)'}
      bg={'gray.700'}
    >
      <Container>
        <Box
          display={'flex'}
          flex={1}
          justifyContent={'flex-end'}
          alignItems={'center'}
          textAlign={'right'}
          marginBottom={'10'}
        >
          <Text>Hello {currentUser.displayName || 'friend'}</Text>
          <Button colorScheme={'teal'} size={'xs'} onClick={handleLogout}>
            Log out
          </Button>
        </Box>

        <AddForm handleAdd={handleAdd} />

        <ProductsList handleEatFlag={handleEatFlag} products={products} />
      </Container>
    </Box>
  );
};
