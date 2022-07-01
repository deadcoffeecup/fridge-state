import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { AuthProvider } from '../context/AuthContext';

import { RequireAuth } from './RequireAuth';

import { Dashboard } from './Dashboard';
import { Signup } from './Signup';
import { Login } from './Login';
import { NotFound } from './NotFound.js';
import { Statistics } from './Statistics';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

const App = () => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
            <Route
              path='/statistics'
              element={
                <RequireAuth>
                  <Statistics />
                </RequireAuth>
              }
            />
            <Route path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;
