import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { push, ref, onValue, remove } from 'firebase/database';
import { Button, Container } from '@chakra-ui/react';

import { database as db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';

export const Dashboard = () => {
  const [products, setProducts] = useState({});
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeFromDb = onValue(
      ref(db, '/' + currentUser.uid),
      (snapshot) => {
        const data = snapshot.val();
        data === null ? setProducts({}) : setProducts(data.products);
      }
    );
    return unsubscribeFromDb;
  }, [currentUser]);

  const handleAdd = (product) => {
    push(ref(db, '/' + currentUser.uid + '/products'), product);
  };
  const handleDelete = (id) => {
    remove(ref(db, '/' + currentUser.uid + '/products/' + id));
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
