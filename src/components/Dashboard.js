import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
  orderBy,
} from 'firebase/firestore';
import {
  Button,
  Box,
  Text,
  Flex,
  Center,
  Container,
  Select,
} from '@chakra-ui/react';

import { db } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

import { ProductsList } from './ProductsList';
import { AddModal } from './AddProduct/AddModal';
import { NoProductsInfo } from './NoProductsInfo';

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState('asc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpened, setIsModalOpened] = useState(false);
  const categoryRef = useRef();

  const [categoryArr, setCategoryArr] = useState([]);
  useEffect(() => {
    setCategoryArr((prev) => [
      ...new Set([...prev, ...new Set(products.map((el) => el.category))]),
    ]);
  }, [products]);

  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const productsColRef = collection(db, 'users', currentUser.uid, 'products');
  const q = query(
    productsColRef,
    where('isEaten', '==', false),
    orderBy('expireDate', order)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      { includeMetadataChanges: true },
      (snapshot) => {
        const productsArr = [];
        snapshot.docs.forEach((doc) => {
          productsArr.push({ ...doc.data(), id: doc.id });
          setProducts([
            ...productsArr
              .filter((el) => el.isWasted !== true)
              .filter(function (el) {
                if (categoryFilter !== 'all') {
                  return el.category === categoryFilter;
                }
                return el;
              }),
          ]);
        });
      }
    );
    return unsubscribe;
  }, [order, categoryFilter]);

  const handleAdd = (product) => {
    addDoc(productsColRef, product);
  };
  const handleFlag = (product, mode) => {
    setDoc(doc(db, 'users', currentUser.uid, 'products', product.id), {
      ...product,
      [mode]: true,
      removeFromFridgeTime: Timestamp.fromDate(new Date()),
    });
    if (
      products.filter((el) => el.category === product.category).length === 1
    ) {
      setCategoryArr((prev) => prev.filter((el) => el !== product.category));
    }
  };
  const handleUpdate = (product) => {
    setDoc(doc(db, 'users', currentUser.uid, 'products', product.id), {
      ...product,
    });
  };

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch {
      console.log('failed to logout');
    }
  }

  return (
    <Box
      color={'white'}
      width={'100%'}
      height={'100%'}
      minHeight={'calc(100vh)'}
      bg={'gray.700'}
    >
      <Container>
        <Flex
          flexDirection={'column'}
          flex={1}
          justifyContent={'flex-end'}
          alignItems={'flex-end'}
          textAlign={'right'}
          marginBottom={'0'}
        >
          <Flex margin={0} alignItems={'center'} flexDirection={'row'}>
            <Text>Hello {currentUser.displayName || 'friend'}</Text>

            <Button
              marginTop={1}
              marginLeft={1}
              colorScheme={'teal'}
              size={'md'}
              onClick={handleLogout}
            >
              Log out
            </Button>
          </Flex>
          <Button
            marginTop={1}
            colorScheme={'teal'}
            size={'md'}
            onClick={() => navigate('/statistics', { replace: true })}
          >
            Statistics
          </Button>
        </Flex>
        <Center margin={5}>
          <AddModal
            setIsModalOpened={setIsModalOpened}
            handleAdd={handleAdd}
            products={products}
          />
        </Center>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Center
            paddingBottom={2}
            width={'90%'}
            justifyContent={'space-between'}
          >
            <Button
              colorScheme={'teal'}
              size={'md'}
              onClick={() =>
                setOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
              }
            >
              Sorted{` `}
              <Text margin={'1'} fontStyle={'oblique'}>
                {` `}
                {order}
              </Text>
              by date
            </Button>
            <Select
              ref={categoryRef}
              onChange={() => setCategoryFilter(categoryRef.current.value)}
              maxWidth={'40%'}
              placeholder='Select filter'
            >
              {categoryArr.map((el) => (
                <option key={el} style={{ color: 'black' }} value={el}>
                  {el}
                </option>
              ))}
            </Select>
            <Button
              colorScheme={'teal'}
              size={'md'}
              onClick={() => setCategoryFilter('all')}
            >
              All
            </Button>
          </Center>
          {products.length ? (
            <ProductsList
              handleUpdate={handleUpdate}
              handleFlag={handleFlag}
              products={products}
            />
          ) : (
            <NoProductsInfo text={'what u have in fridge'} />
          )}
        </Flex>
      </Container>
    </Box>
  );
};
