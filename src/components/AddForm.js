import React, { useRef } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  Center,
} from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

export const AddForm = ({ handleAdd }) => {
  const nameRef = useRef();
  const expireDateRef = useRef();
  const categoryRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd({
      name: nameRef.current.value,
      expireDate: Timestamp.fromDate(new Date(expireDateRef.current.value)),
      category: categoryRef.current.value,
      isEaten: false,
    });
    nameRef.current.value = '';
    expireDateRef.current.value = '';
    categoryRef.current.value = '';
  };
  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            borderColor='teal.300'
            ref={nameRef}
            id='name'
            name='name'
            type='text'
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='expireDate'>Expire Date</FormLabel>
          <Input
            borderColor='teal.300'
            required
            ref={expireDateRef}
            id={'expireDate'}
            name='expireDate'
            type='date'
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Select
            borderColor='teal.300'
            placeholder='Select option'
            id={'category'}
            name='category'
            ref={categoryRef}
          >
            <option style={{ color: 'black' }} value='diary'>
              diary
            </option>
            <option style={{ color: 'black' }} value='meat'>
              meat
            </option>
            <option style={{ color: 'black' }} value='vegetables'>
              vegetables
            </option>
            <option style={{ color: 'black' }} value='fruits'>
              fruits
            </option>
          </Select>
        </FormControl>
        <Center marginBlock={3}>
          <Button
            borderRadius={'xl'}
            size={'sm'}
            colorScheme={'teal'}
            type='submit'
          >
            Add
          </Button>
        </Center>
      </form>
    </Center>
  );
};
