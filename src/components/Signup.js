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

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if ([...passwordRef.current.value].length < 8) {
      return setError(
        'password has to be at least 8 character and uppercase and lowercase and digit and special char'
      );
    } else if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('passwords do not match');
    }
    try {
      setError('');
      setIsLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/', { replace: true });
    } catch {
      setError('failed to create an account');
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
      <Container>
        <Heading>Sign up</Heading>
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
          <FormControl>
            <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
            <Input
              ref={confirmPasswordRef}
              type='password'
              name='confirmPassword'
              id='confirmPassword'
            />
          </FormControl>
          <Button
            colorScheme={'teal'}
            size={'xs'}
            disabled={isLoading}
            type='submit'
          >
            Sign up!
          </Button>
        </form>
      </Container>
      <Container>
        Already singed up?{' '}
        <Link to='/login'>
          <Button colorScheme={'teal'} size={'xs'}>
            Log in
          </Button>
        </Link>
      </Container>
    </Box>
  );
};
