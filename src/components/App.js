import { useState, useEffect } from 'react';
import { push, ref, onValue, remove } from 'firebase/database';

import { database as db } from '../firebaseConfig';

import { ProductsList } from './ProductsList';
import { Form } from './Form';
import { Signup } from './Signup';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const unsubscribeFromDb = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      setProducts(data.products);
    });
    return unsubscribeFromDb;
  }, []);

  const handleAdd = (data) => {
    push(ref(db, '/products'), data);
  };
  const handleDelete = (id) => {
    remove(ref(db, '/products/' + id));
  };

  return (
    <AuthProvider>
      <Form handleAdd={handleAdd} />
      <ProductsList handleDelete={handleDelete} products={products} />
      <Signup />
    </AuthProvider>
  );
};

export default App;
