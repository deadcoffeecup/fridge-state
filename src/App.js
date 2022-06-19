import { useState, useEffect } from 'react';
import { push, ref, onValue } from 'firebase/database';

import { database } from './firebaseConfig';
import { ProductsList } from './ProductsList';
import { Form } from './Form';

const App = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    onValue(ref(database), (snapshot) => {
      const data = snapshot.val();
      setProducts(data.products);
    });
  }, []);

  const handleAdd = (data) => {
    push(ref(database, '/products'), data);
  };

  return (
    <div>
      <Form handleAdd={handleAdd} />
      <ProductsList products={products} />
    </div>
  );
};

export default App;
