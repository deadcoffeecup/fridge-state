import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <div>
        <h2>Sign up</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>email</label>
          <input ref={emailRef} type='email' name='email' id='email' />
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} type='password' name='' id='password' />
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            ref={confirmPasswordRef}
            type='password'
            name='confirmPassword'
            id='confirmPassword'
          />
          <button disabled={isLoading} type='submit'>
            Sign up!
          </button>
        </form>
      </div>
      <div>
        Already singed up? <Link to='/login'>Log in</Link>
      </div>
    </div>
  );
};
