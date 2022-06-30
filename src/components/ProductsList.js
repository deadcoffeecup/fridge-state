import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  Container,
} from '@chakra-ui/react';

export const ProductsList = ({ products, handleEatFlag }) => {
  const arrOfProducts = Object.values(products);

  return (
    <Container>
      <Accordion
        border='2px'
        borderColor='teal.300'
        borderRadius={'xl'}
        allowMultiple
      >
        {arrOfProducts?.map((product) => (
          <AccordionItem borderRadius={'xl'} key={product.id}>
            <h2>
              <AccordionButton>
                <Flex
                  justifyContent={'space-between'}
                  flex='1'
                  textAlign='left'
                >
                  {product.name}
                  <Button
                    as={Box}
                    size={'sm'}
                    colorScheme={'teal'}
                    borderRadius={'xl'}
                    onClick={() => handleEatFlag(product)}
                  >
                    Eat
                  </Button>
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Box flex='1' textAlign='left'>
                {product.expireDate &&
                  product.expireDate.toDate().toDateString()}
              </Box>
              <Box>{product.category}</Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
