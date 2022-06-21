import React from 'react';
export const ProductsList = ({ products, handleDelete }) => {
  for (const key in products) {
    products[key]['id'] = key;
  }
  const arrOfProducts = Object.values(products);

  return (
    <div>
      <ul>
        {arrOfProducts?.map((product) => (
          <div key={product.id}>
            <li>{product.name}</li>
            <ul>
              <li>{product.expireDate}</li>
              <li>{product.category}</li>
            </ul>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};
