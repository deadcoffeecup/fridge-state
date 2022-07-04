import React from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Container,
} from '@chakra-ui/react';
import EatOrWasteAlert from './EatOrWasteAlert';

export const ProductsList = ({ products, handleFlag }) => {
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
                  <Flex justifyContent={'space-between'}>
                    <Box>{product.name}</Box>
                    {'    '}
                    <Box fontWeight={'extrabold'}>
                      {product.tag && product.tag.toUpperCase()}
                    </Box>
                  </Flex>
                  <EatOrWasteAlert product={product} handleFlag={handleFlag} />
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
