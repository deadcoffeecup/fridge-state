import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Container,
  Button,
} from '@chakra-ui/react';

export const ProductsList = ({ products, handleDelete }) => {
  for (const key in products) {
    products[key]['id'] = key;
  }
  const arrOfProducts = Object.values(products);

  return (
    <Container>
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
              <Button onClick={() => handleDelete(product.id)}>Delete</Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
