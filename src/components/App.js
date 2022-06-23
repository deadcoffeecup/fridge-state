import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../context/AuthContext';

import { RequireAuth } from './RequireAuth';

import { Dashboard } from './Dashboard';
import { Signup } from './Signup';
import { Login } from './Login';
import { NotFound } from './NotFound.js';

const App = () => {
  return (
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
          <Route path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
