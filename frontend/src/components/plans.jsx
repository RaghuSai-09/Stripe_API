import React, { useState} from 'react';
import {Link,  useNavigate } from 'react-router-dom';
import * as api from '../api.js';


const Plans = () => {

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [isMonthlySelected, setMonthlySelected] = useState(true); 
  const [selectedColumn, setSelectedColumn] = useState(null); 
  let selectedPlan = '';
  let price = 0;
  const navigate = useNavigate();

  const handleMonthlyToggle = () => {
    setMonthlySelected(true);
  };

  const handleYearlyToggle = () => {
    setMonthlySelected(false);
  };

  const handleSubmit = async (selectedPlan, price, isMonthlySelected) => {
    console.log(selectedPlan, price, isMonthlySelected);
    try {
      const response = await api.UpdatePlan({ selectedPlan, price, isMonthlySelected,
        id: user._id });
      console.log(response);
      if (response.status === 200) {
        window.alert('Plan Selected');
        
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const handleColumnHeaderClick = (index) => {
    setSelectedColumn(index);
  };

  const handleNextClick = () => {
    
    switch (selectedColumn) {
      case 0:
        selectedPlan='Mobile';
        price = (isMonthlySelected ? 100 : 1000);
        break;
      case 1:
        selectedPlan = 'Basic';
        price = (isMonthlySelected ? 200 : 2000);
        break;
      case 2:
        selectedPlan = 'Standard';
        price = (isMonthlySelected ? 500 : 5000);
        break;
      case 3:
        selectedPlan='Premium';
        price = (isMonthlySelected ? 700 : 7000);
        break;
      default:
        selectedPlan = '';
        price = 0;
        break;
    }
    if(selectedPlan === '') {
      window.alert('Please select a plan');
      navigate('/plans');
    }
    else{
      handleSubmit(selectedPlan, price, isMonthlySelected);
      navigate('/plans')
  }
  };



  return (
    <div className='min-h-screen w-full items-center justify-center flex'>
      <div className='justify-center items-center'>
        <h1 className='text-2xl flex justify-center font-semibold'>Choose the right plan for you, {user.name}</h1>
        <table className='w-full border-separate border-spacing-10'>
          <thead>
            <tr>
              <th>
                <div className={`bg-blue-900 text-white h-20 w-auto rounded-full flex justify-center items-center gap-3 px-3 `}>
                  <div className={`  cursor-pointer p-2 rounded-3xl ${isMonthlySelected ? 'bg-white text-blue-900' : ''}`} onClick={handleMonthlyToggle}>
                    Monthly
                  </div>
                  <div className={`cursor-pointer p-2 rounded-3xl ${!isMonthlySelected ? 'bg-white text-blue-900' : ''}`} onClick={handleYearlyToggle}>
                    Yearly
                  </div>
                </div>
              </th>
              <th onClick={() => handleColumnHeaderClick(0)}>
                <div className={` text-white  h-32 w-32 flex justify-center cursor-pointer items-center ${selectedColumn === 0 ? 'opacity-100 bg-blue-900' : 'opacity-70  bg-blue-900 '}`}>Mobile</div>
              </th>
              <th onClick={() => handleColumnHeaderClick(1)}>
                <div className={` text-white  h-32 w-32 flex justify-center items-center cursor-pointer ${selectedColumn === 1 ? 'opacity-100 bg-blue-900' : 'opacity-70  bg-blue-900 '}`}>Basic</div>
              </th>
              <th onClick={() => handleColumnHeaderClick(2)}>
                <div className={` text-white cursor-pointer  h-32 w-32 flex justify-center items-center ${selectedColumn === 2 ? 'opacity-100 bg-blue-900' : 'opacity-70  bg-blue-900 '}`}>Standard</div>
              </th>
              <th onClick={() => handleColumnHeaderClick(3)}>
                <div className={` text-white  h-32 cursor-pointer w-32 flex justify-center items-center ${selectedColumn === 3 ? 'opacity-100 bg-blue-900' : ' opacity-70 bg-blue-900'}`}>Premium</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b border-gray-300 `}>
              <td className={`py-2 `}>Monthly Price</td>
              <td className={`py-2 text-center  ${selectedColumn === 0 ? 'text-blue-900  font-semibold' : ''}`}>{isMonthlySelected ? `Rs.100` : `Rs.1000`}</td>
              <td className={`py-2  text-center ${selectedColumn === 1 ? 'text-blue-900 font-semibold' : ''}`}>{isMonthlySelected ? `Rs.200` : `Rs.2000`}</td>
              <td className={`py-2 text-center ${selectedColumn === 2 ? 'text-blue-900  font-semibold' : ''}`}>{isMonthlySelected ? `Rs.500` : `Rs.5000`}</td>
              <td className={`py-2 text-center  ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}>{isMonthlySelected ? `Rs.700` : `Rs.7000`}</td>
            </tr>
            <tr className={`border-b border-gray-300 `}>
              <td className={`py-2 `}>Video Quality</td>
              <td className={`py-2 text-center ${selectedColumn === 0 ? 'text-blue-900 font-semibold' : ''}`}>Good</td>
              <td className={`py-2 text-center  ${selectedColumn === 1 ? 'text-blue-900 font-semibold' : ''}`}>Good</td>
              <td className={`py-2 text-center  ${selectedColumn === 2 ? 'text-blue-900 font-semibold' : ''}`}>Better</td>
              <td className={`py-2 text-center  ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}>Best</td>
            </tr>
            <tr className={`border-b border-gray-300 `}>
              <td className={`py-2 `}>Resolution</td>
              <td className={`py-2  text-center ${selectedColumn === 0 ? 'text-blue-900 font-semibold' : ''}`}>480p</td>
              <td className={`py-2  text-center ${selectedColumn === 1 ? 'text-blue-900 font-semibold ' : ''}`}>480p</td>
              <td className={`py-2 text-center   ${selectedColumn === 2 ? 'text-blue-900 font-semibold' : ''}`}>1080p</td>
              <td className={`py-2 text-center   ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}>4K+HDR</td>
            </tr>
            <tr className={`border-b border-gray-300 `}>
              <td className={` `}>Devices you can use to watch</td>
              <td className={` text-center  ${selectedColumn === 0 ? 'text-blue-900 font-semibold' : ''}`}>Phone</td>
              <td className={` text-center   ${selectedColumn === 1 ? 'text-blue-900 font-semibold' : ''}`}>Phone</td>
              <td className={` text-center   ${selectedColumn === 2 ? 'text-blue-900 font-semibold' : ''}`}>Phone</td>
              <td className={`  text-center  ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}>Phone</td>
            </tr>
            <tr className={`border-b border-gray-300 `}>
              <td className={` `}></td>
              <td className={`text-center ${selectedColumn === 0 ? 'text-blue-900 font-semibold' : ''}`}>Tablet</td>
              <td className={`text-center  ${selectedColumn === 1 ? 'text-blue-900 font-semibold' : ''}`}>Tablet</td>
              <td className={`text-center   ${selectedColumn === 2 ? 'text-blue-900 font-semibold' : ''}`}>Tablet</td>
              <td className={`text-center   ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}>Tablet</td>
            </tr>
            <tr className={`border-b border-gray-300 `}>
              <td className={``}></td>
              <td className={`text-center ${selectedColumn === 0 ? 'text-blue-900 font-semibold' : ''}`}></td> 
              <td className={`text-center  ${selectedColumn === 1 ? 'text-blue-900 font-semibold' : ''}`}>Computer</td>
              <td className={`text-center   ${selectedColumn === 2 ? 'text-blue-900 font-semibold' : ''}`}>Computer</td>
              <td className={`text-center   ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}>Computer</td>
            </tr>
            <tr className={`border-b border-gray-300 `}>
              <td className={``}></td>
              <td className={`text-center ${selectedColumn === 0 ? 'text-blue-900 font-semibold' : ''}`}></td> 
              <td className={`text-center  ${selectedColumn === 1 ? 'text-blue-900 font-semibold' : ''}`}>TV</td>
              <td className={`text-center   ${selectedColumn === 2 ? 'text-blue-900 font-semibold' : ''}`}>TV</td>
              <td className={`text-center   ${selectedColumn === 3 ? 'text-blue-900 font-semibold' : ''}`}> TV</td>
            </tr>
          </tbody>  
        </table>
        <div className='flex justify-center items-center'>
        <Link  to='/checkout' className='bg-blue-900 text-white h-10 w-1/3 ml-10 rounded-sm flex justify-center items-center'
        onClick={() => {
          handleNextClick();
        }}>
          Next
        </Link>
        </div>
        </div>
    </div>
  );
};

export default Plans;
