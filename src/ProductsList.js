import React from 'react';
export const ProductsList = ({ products }) => {
  products = Object.values(products);
  return (
    <div>
      <ul>
        {products.map((product) => (
          <div key={product.id}>
            <li>{product.name}</li>
            <ul>
              <li>{product.expireDate}</li>
              <li>{product.category}</li>
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};
