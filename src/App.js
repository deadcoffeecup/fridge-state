import { useState, useEffect } from 'react';
import { push, ref, onValue, remove } from 'firebase/database';

import { database as db } from './firebaseConfig';
import { ProductsList } from './ProductsList';
import { Form } from './Form';

const App = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      setProducts(data.products);
    });
  }, []);

  const handleAdd = (data) => {
    push(ref(db, '/products'), data);
  };
  const handleDelete = (id) => {
    remove(ref(db, '/products/' + id));
  };

  return (
    <div>
      <Form handleAdd={handleAdd} />
      <ProductsList handleDelete={handleDelete} products={products} />
    </div>
  );
};

export default App;
