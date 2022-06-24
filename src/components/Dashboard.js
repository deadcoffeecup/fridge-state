import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { push, ref, onValue, remove } from 'firebase/database';

import { database as db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';

export const Dashboard = () => {
  const [products, setProducts] = useState({});
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeFromDb = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      setProducts(data.products);
    });
    return unsubscribeFromDb;
  }, []);

  const handleAdd = (product) => {
    push(ref(db, '/' + currentUser.uid + '/products'), product);
  };
  const handleDelete = (id) => {
    remove(ref(db, '/' + currentUser.uid + '/products' + id));
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
    <div>
      <button onClick={handleLogout}>Log out</button>
      <AddForm handleAdd={handleAdd} />
      <ProductsList handleDelete={handleDelete} products={products} />
    </div>
  );
};
