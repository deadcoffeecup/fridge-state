import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Container,
  Input,
  Button,
  Heading,
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
    <Box
      color={'white'}
      width={'calc(100vw)'}
      height={'calc(100vh)'}
      bg={'gray.700'}
    >
      {' '}
      <Container>
        <Heading>Log in</Heading>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel htmlFor='email'>email</FormLabel>
            <Input ref={emailRef} type='email' name='email' id='email' />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input ref={passwordRef} type='password' name='' id='password' />
          </FormControl>
          <Button
            colorScheme={'teal'}
            size={'xs'}
            disabled={isLoading}
            type='submit'
          >
            Login
          </Button>
        </form>
      </Container>
      <Container>
        Need an account?{' '}
        <Link to='/signup'>
          <Button colorScheme={'teal'} size={'xs'}>
            Sign up!
          </Button>
        </Link>
      </Container>
    </Box>
  );
};
