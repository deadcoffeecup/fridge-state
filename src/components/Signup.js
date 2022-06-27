import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

export const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { signup } = useAuth();

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
    } catch {
      setError('failed to create an account');
    }
    setIsLoading(false);
  }
  return (
    <Container>
      <Container>
        <h2>Sign up</h2>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormLabel htmlFor='email'>email</FormLabel>
          <Input ref={emailRef} type='email' name='email' id='email' />
          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input ref={passwordRef} type='password' name='' id='password' />
          <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
          <Input
            ref={confirmPasswordRef}
            type='password'
            name='confirmPassword'
            id='confirmPassword'
          />
          <Button disabled={isLoading} type='submit'>
            Sign up!
          </Button>
        </form>
      </Container>
      <Container>
        Already singed up?{' '}
        <Link to='/login'>
          <Button>Log in</Button>
        </Link>
      </Container>
    </Container>
  );
};
