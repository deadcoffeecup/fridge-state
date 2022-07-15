import React, { useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import EatOrWasteAlert from './EatOrWasteAlert';

export const ProductsList = ({ products, handleFlag }) => {
  const arrOfProducts = Object.values(products);
  const now = new Date();
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  return (
    <Container>
      <Accordion
        border='2px'
        borderColor='teal.300'
        borderRadius={'xl'}
        allowMultiple
        marginBottom={20}
      >
        <Heading textAlign={'center'}>Fridge</Heading>
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
                    {now.getTime() > product.expireDate.toDate().getTime() ? (
                      <Box color={'red.400'}>{product.name}</Box>
                    ) : (
                      <Box color={'white'}>{product.name}</Box>
                    )}
                    {'    '}
                    <Box marginLeft={3} fontWeight={'extrabold'}>
                      {product.tag && product.tag.toUpperCase()}
                    </Box>
                  </Flex>
                  <EatOrWasteAlert
                    setIsAlertOpened={setIsAlertOpened}
                    product={product}
                    handleFlag={handleFlag}
                  />
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Box flex='1' textAlign='left'>
                {now.getTime() > product.expireDate.toDate().getTime() ? (
                  <Text color={'red'}>
                    {product.expireDate.toDate().toDateString()}
                  </Text>
                ) : (
                  <Text color={'white'}>
                    {product.expireDate.toDate().toDateString()}
                  </Text>
                )}
              </Box>
              <Box>{product.category}</Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};
