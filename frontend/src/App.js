import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/auth';
import Signup from './components/signup';
import Login from './components/login';
import Checkout from './components/checkout';
import Plans from './components/plans';
import Auth from './utils/controller';
import Success from './components/Success';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<Auth> <Plans /> </Auth>} />
          <Route path="/checkout" element={<Auth> <Checkout /> </Auth>} />
          <Route path="/success" element={<Success /> } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
