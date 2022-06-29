import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { Button, Container } from '@chakra-ui/react';

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const productsColRef = collection(db, 'users', currentUser.uid, 'products');

  useEffect(() => {
    const unsubscribe = onSnapshot(productsColRef, (snapshot) => {
      const productsArr = [];
      snapshot.docs.forEach((doc) => {
        productsArr.push({ ...doc.data(), id: doc.id });
        setProducts([...productsArr]);
      });
    });

    return unsubscribe;
  }, [productsColRef]);

  const handleAdd = (product) => {
    addDoc(productsColRef, product);
  };
  const handleDelete = (id) => {
    deleteDoc(doc(db, 'users', currentUser.uid, 'products', id));
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
