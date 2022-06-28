import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { Button, Container } from '@chakra-ui/react';

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setProducts((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    });

    return unsubscribe;
  }, []);

  const handleAdd = (product) => {
    // push(ref(db, '/' + currentUser.uid + '/products'), product);
  };
  const handleDelete = (id) => {
    // remove(ref(db, '/' + currentUser.uid + '/products/' + id));
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
    <Container>
      <Button onClick={handleLogout}>Log out</Button>

      <AddForm handleAdd={handleAdd} />

      <ProductsList handleDelete={handleDelete} products={products} />
    </Container>
  );
};
