import React, { useState } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Container,
  Input,
  Button,
  Select,
} from '@chakra-ui/react';

export const AddForm = ({ handleAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    expireDate: '',
    category: '',
  });
  const handleChange = ({ target: { name, value } }) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.name.value = '';
    e.target.expireDate.value = '';
    e.target.category.value = '';
    handleAdd(product);
    setProduct({
      name: '',
      expireDate: '',
      category: '',
    });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor='name'>Name:</FormLabel>
          <Input onChange={handleChange} name='name' type='text' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='expireDate'>Expire Date</FormLabel>
          <Input onChange={handleChange} name='expireDate' type='date' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Select
            placeholder='Select option'
            onChange={handleChange}
            name='category'
          >
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
