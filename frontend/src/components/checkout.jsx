/* eslint-disable no-unused-vars */
import React, { useEffect,useState } from 'react';
import * as api from '../api.js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import config from '../config.json';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(config.KEY);

const Checkout = () => {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const [PlanDetails, setPlanDetails] = useState([]);
  const [PaymentError, setPaymentError] = useState('');
  const [PaymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const elements = useElements();
  const stripe = useStripe();
  
  
  useEffect(() => {
    const fetchPlanDetails = async () => {
      const { data } = await api.getPlans(user.email);
      setPlanDetails(data.data);
    };
    fetchPlanDetails();
  }, [user.email]);

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({
          amount: PlanDetails.price * 100, 
          currency: 'inr',

        }),
      });
  
      const { clientSecret } = await response.json();
  
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
  
      if (error) {
        setPaymentError('Payment failed');
      } else {

        setPaymentSuccess(true);
        navigate('/success');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setPaymentError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className='bg-blue-900 min-h-screen flex justify-center items-center'>
      <div className='bg-white flex flex-col md:flex-row rounded-lg w-4/6 md:w-2/3 m-5 md:m-15'>
        <div className='p-5 md:pl-10 w-full md:w-2/3'>
          <h1 className='text-2xl font-semibold'>Complete your payment</h1>
          <p className='text-gray-500'>Enter your credit or debit card details below</p>
          <div className='mt-6 mb-6 p-5 border-2 border-gray-400 '>
          <CardElement style={{
            base: {
              color: '#0000',
              fontFamily: 'Arial, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#32325d',
              },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
            },
          }}/>
          </div>
          <button
            className='bg-blue-900 p-3 text-white py-2 rounded-sm'
            onClick={handlePayment}
          >
            Confirm Payment
          </button>
        </div>
        <div className='bg-gray-200 rounded-r w-full md:w-1/2'>
          <div className='p-5 my-5'>
            <h1 className='text-2xl font-semibold'>Order Summary</h1>
            <div className='mt-4'>
              <table className='w-full'>
                <tbody>
                  <tr className='border-b border-gray-300'>
                    <td className='py-3 text-left'>Plan Name</td>
                    <td className='py-3 text-right'>{PlanDetails.name}</td>
                  </tr>
                  <tr className='border-b border-gray-300'>
                    <td className='pb-3 text-left'>Billing cycle</td>
                    <td className='pb-3 text-right'>{PlanDetails.isMonthlySelected ? 'Monthly': 'Yearly'}</td>
                  </tr>
                  <tr className='border-b border-gray-300'>
                    <td className='pb-3 text-left'>Plan Price</td>
                    <td className='pb-3 text-right'>{PlanDetails.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function form(){
  return(
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}

export default form;
