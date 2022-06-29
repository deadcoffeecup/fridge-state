import React, { useRef } from 'react';

import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Button,
  Select,
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
    });
    nameRef.current.value = '';
    expireDateRef.current.value = '';
    categoryRef.current.value = '';
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor='name'>Name:</FormLabel>
          <Input ref={nameRef} name='name' type='text' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='expireDate'>Expire Date</FormLabel>
          <Input required ref={expireDateRef} name='expireDate' type='date' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Select placeholder='Select option' name='category' ref={categoryRef}>
            <option value='diary'>diary</option>
            <option value='meat'>meat</option>
            <option value='vegetables'>vegetables</option>
            <option value='fruits'>fruits</option>
          </Select>
        </FormControl>

        <Button type='submit'>Add</Button>
      </form>
    </Container>
  );
};
