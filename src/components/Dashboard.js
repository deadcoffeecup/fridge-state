import { useState, useEffect } from 'react';
import { push, ref, onValue, remove } from 'firebase/database';

import { database as db } from '../firebaseConfig';
import { ProductsList } from './ProductsList';
import { AddForm } from './AddForm';

import React from 'react';

export const Dashboard = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const unsubscribeFromDb = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      setProducts(data.products);
    });
    return unsubscribeFromDb;
  }, []);

  const handleAdd = (product) => {
    push(ref(db, '/products'), product);
  };
  const handleDelete = (id) => {
    remove(ref(db, '/products/' + id));
  };

  return (
    <div>
      <AddForm handleAdd={handleAdd} />
      <ProductsList handleDelete={handleDelete} products={products} />
    </div>
  );
};
