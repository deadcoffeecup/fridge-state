import { useState, useEffect } from 'react';
import { set, ref, onValue } from 'firebase/database';

import { database } from './firebaseConfig';
import { ProductsList } from './ProductsList';
import { Form } from './Form';

const App = () => {
  const [products, setProducts] = useState([]);

  const databaseRef = ref(database);

  useEffect(() => {
    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setProducts(data.products);
    });
  }, [databaseRef]);

  const handleAdd = (data) => {
    set(databaseRef, {
      products: [...products, data],
    });
  };
  return (
    <div>
      <Form handleAdd={handleAdd} />
      <ProductsList products={products} />
    </div>
  );
};

export default App;
