import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

export const ProductsList = ({ products, handleDelete }) => {
  for (const key in products) {
    products[key]['id'] = key;
  }
  const arrOfProducts = Object.values(products);

  return (
    <Accordion allowMultiple>
      {arrOfProducts?.map((product) => (
        <AccordionItem key={product.id}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                {product.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Box>{product.expireDate}</Box>
            <Box>{product.category}</Box>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
