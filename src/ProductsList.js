import React from 'react';
export const ProductsList = ({ products }) => {
  for (const key in products) {
    products[key]['id'] = key;
  }
  const arrProducts = Object.values(products);

  return (
    <div>
      <ul>
        {arrProducts.map((product) => (
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
