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
} from '@chakra-ui/react';

import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <Container>
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
          <Button disabled={isLoading} type='submit'>
            Login
          </Button>
        </form>
      </Container>
      <Container>
        Need an account?{' '}
        <Link to='/signup'>
          <Button>Sign up!</Button>
        </Link>
      </Container>
    </Container>
  );
};
