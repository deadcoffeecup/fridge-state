import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Container,
  Input,
  Button,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/react';

import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login, currentUser } = useAuth();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (currentUser) {
    navigate('/', { replace: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/', { replace: true });
    } catch {
      setError('failed to log in');
    }
    setIsLoading(false);
  }
  return (
    <Flex
      color={'white'}
      width={'calc(100vw)'}
      height={'calc(100vh)'}
      bg={'gray.700'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Container>
        <Heading>Log in</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor='email'>email</FormLabel>
            <Input ref={emailRef} type='email' name='email' id='email' />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input
              ref={passwordRef}
              type='password'
              name='password'
              id='password'
            />
          </FormControl>
          {error && <Box color={'red'}>{error}</Box>}
          <Button
            colorScheme={'teal'}
            size={'md'}
            disabled={isLoading}
            type='submit'
          >
            Login
          </Button>
        </form>
      </Container>
      <Container>
        Need an account?
        <Link to='/signup'>
          <Button colorScheme={'teal'} size={'md'}>
            Sign up!
          </Button>
        </Link>
      </Container>
    </Flex>
  );
};
