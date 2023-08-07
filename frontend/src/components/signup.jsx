import React, { useState } from 'react';
import { Link, useNavigate , Navigate} from 'react-router-dom';
import * as api from '../api.js';
import { useAuth } from '../utils/auth';
const Signup = () => {

  const  { isSigned } = useAuth();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  if(isSigned){
    return <Navigate to="/plans" />;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.signup({
        name,
        email,
        password
      });
      console.log(response); 
      if (response.status === 200) {
        window.alert('Signup Successful');
        navigate('/login');
      }
      else if (response.status === 400) {
        window.alert('User already exists');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-blue-900 min-h-screen flex justify-center items-center'>
    <div className='bg-white rounded-lg pt-10 w-96 md:w-1/3 m-15'>
      <h1 className='text-2xl mb-8 flex justify-center font-semibold'>Create an account</h1>
      <form className='mb-4 mx-10' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-1 ' htmlFor='name' >Name</label>
          <input
            type='text' placeholder='Manojkumar' required id='name'
            className='w-full px-3 py-2 border rounded-lg '
            value={name} onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='email'>Email</label>
          <input
            type='email' placeholder='manoj@richpanel.com' required
            className='w-full px-3 py-2 border rounded-lg' id='email'
            value={email} onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-1' htmlFor='password'>Password</label>
          <input placeholder='*********'
            type='password' required
            className='w-full px-3 py-2 border rounded-lg' id='password'
            value={password} onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className='mb-4'>
         <input type='checkbox' className='mr-2' />
          <label>Remember Me</label>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-900 text-white py-2 rounded-md  hover:bg-blue-900'
        >
          Sign Up
        </button>
      </form>
      <p className='text-center mb-8'>
       Already have an account? <Link to='/login' className='text-blue-600'>Login</Link>
      </p>
    </div>
  </div>
  )
}

export default Signup