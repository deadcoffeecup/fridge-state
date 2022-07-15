import { Flex } from '@chakra-ui/react';
import React from 'react';

export const NoProductsInfo = ({ text }) => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'}>
      Add products to see {text}
    </Flex>
  );
};
