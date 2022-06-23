import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

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
    <div>
      <div>
        <h2>Log in</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>email</label>
          <input ref={emailRef} type='email' name='email' id='email' />
          <label htmlFor='password'>Password</label>
          <input ref={passwordRef} type='password' name='' id='password' />
          <button disabled={isLoading} type='submit'>
            Login
          </button>
        </form>
      </div>
      <div>
        Need an account? <Link to='/signup'>Sign up!</Link>
      </div>
    </div>
  );
};
