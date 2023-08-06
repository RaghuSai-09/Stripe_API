import * as api from '../api.js';
import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const { isSigned, login } = useAuth();

  if (isSigned) {
    return <Navigate to="/plans" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.login({
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.alert('Login Successful');
        login();
        navigate('/plans');
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="bg-blue-900 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg pt-10 w-96 m-15 md:w-1/3">
        <h1 className="text-2xl mb-8 flex justify-center font-semibold">Login to your account</h1>
        <form className="mb-4 mx-10" onSubmit={handleSubmit}>
        <div className='mb-4'>
        <label className='block mb-1 ' htmlFor='email'>Email</label>
        <input id='email'
          type='email' placeholder='manoj@richpanel.com' required
          className='w-full px-3 py-2 border rounded-lg '
          value={email} onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label className='block mb-1' htmlFor='password' >Password</label>
        <input placeholder='*********'
          type='password' required id='password'
          className='w-full px-3 py-2 border rounded-lg'
          value={password} onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className='mb-4'>
       <input type='checkbox' className='mr-2' />
        <label>Remember me</label>
      </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-900"
          >
            Login
          </button>
        </form>
        <p className="text-center mb-8">
          New to MyApp? <Link to="/" className="text-blue-600">Sign up</Link>
        </p>
      
      </div>
    </div>
  );
}

export default Login;
