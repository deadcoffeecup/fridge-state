import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Signup } from './Signup';
import { Login } from './Login';
import { NotFound } from './NotFound.js';
import { AuthProvider } from '../context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Dashboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
