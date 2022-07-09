import React, { useRef, useState } from 'react';

import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Center,
} from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';

import AddBtn from './AddBtn';

export const randomNumberToHex = (arr) => {
  function randomNumber() {
    return Math.floor(Math.random() * 256);
  }
  let tagNumber = randomNumber();

  for (let i = 0; i < arr.length; i++) {
    if (tagNumber === parseInt(arr[i].tag, 16)) {
      tagNumber = randomNumber();
      i = 0;
    }
  }
  return tagNumber.toString(16);
};

export const AddForm = ({ handleAdd, products }) => {
  const nameRef = useRef();
  const expireDateRef = useRef();
  const categoryRef = useRef();
  const [tag, setTag] = useState('');

  const arrOfProducts = Object.values(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd({
      name: nameRef.current.value,
      expireDate: Timestamp.fromDate(new Date(expireDateRef.current.value)),
      category: categoryRef.current.value,
      isEaten: false,
      tag: tag,
    });
    nameRef.current.value = '';
    expireDateRef.current.value = '';
    categoryRef.current.value = '';
  };

  return (
    <Center>
      <form onSubmit={(e) => handleSubmit(e, tag)}>
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
            onChange={() => setTag(randomNumberToHex(arrOfProducts))}
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
          <AddBtn
            categoryRef={categoryRef}
            nameRef={nameRef}
            tag={tag}
            setTag={setTag}
          />
        </Center>
      </form>
    </Center>
  );
};
