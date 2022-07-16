import { Center, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import AddBtn from './AddBtn';
import { randomNumberToHex } from './AddForm';
import _ from 'lodash';

const API = 'https://world.openfoodfacts.org/api/v0/product/';

export const AddByBarcode = ({ results, handleAdd, products }) => {
  const [productFromAPI, setProductFromAPI] = useState({});
  const [tag, setTag] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    let mostFrequentEl = _.head(_(results).countBy().entries().maxBy(_.last));

    setResult(mostFrequentEl);
  }, [results]);

  const arrOfProducts = Object.values(products);

  const nameRef = useRef();
  const expireDateRef = useRef();
  const categoryRef = useRef();
  categoryRef.current = { value: 1 };

  const findProduct = (barcode) => {
    fetch(API + +barcode + '.json')
      .then((r) => r.json())
      .then((json) => {
        json.status
          ? setProductFromAPI(json.product)
          : alert('product not found');
      })
      .catch((err) => console.warn(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd({
      name: productFromAPI.product_name,
      expireDate: Timestamp.fromDate(new Date(expireDateRef.current.value)),
      category: productFromAPI.categories_hierarchy[0].slice(
        3,
        productFromAPI.categories_hierarchy[0].length
      ),
      isEaten: false,
      tag: tag,
    });
    nameRef.current.value = '';
    expireDateRef.current.value = '';
  };
  return (
    <div>
      <Center>
        <form onSubmit={(e) => handleSubmit(e, tag)}>
          <FormControl>
            <FormLabel htmlFor='name'>Barcode</FormLabel>
            <Input
              borderColor='teal.300'
              ref={nameRef}
              id='barcode'
              name='barocode'
              type='number'
              value={result}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='expireDate'>Expire Date</FormLabel>
            <Input
              onChange={() =>
                setTag(
                  randomNumberToHex(arrOfProducts),
                  findProduct(nameRef.current.value)
                )
              }
              borderColor='teal.300'
              required
              ref={expireDateRef}
              id={'expireDate'}
              name='expireDate'
              type='date'
            />
          </FormControl>

          <Center marginBlock={3}>
            <AddBtn
              nameRef={nameRef}
              categoryRef={categoryRef}
              tag={tag}
              setTag={setTag}
            />
          </Center>
        </form>
      </Center>
    </div>
  );
};
