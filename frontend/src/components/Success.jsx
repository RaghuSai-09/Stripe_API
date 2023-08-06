import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api.js';




const PlanDetails = () => {

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const [stat, setstat] = useState('Cancel')
    const [plan, setplan] = useState(true)
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [PlanDetails, setPlanDetails] = useState([]);
    const date = (i,j)=> {   
        const d = new Date();
        const month = d.getMonth()+1;
        const day = d.getDate() ;
        const year = d.getFullYear() + j;
        const date =  months[month-1+i] + ' ' + day + ' '+ year;
        return date;
    }
    useEffect(() => {
        const fetchPlanDetails = async () => {
          const { data } = await api.getPlans(user.email);
          setPlanDetails(data.data);
        };
        fetchPlanDetails();
      }, [user.email]);

    return (
        <div className="bg-blue-900 h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full md:max-w-md xl:max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold text-lg flex items-center">
                        Current Plan Details
                        <div className={`px-2 py-1  text-sm ml-2 font-bold  rounded ${plan ? 'text-blue-900 bg-blue-200 ' : 'text-red-500 bg-red-100'}`}>
                            { plan? 'Active' : 'Cancelled'}
                        </div>
                    </div>
                    <div className="px-2 py-1 text-sm text-blue-900 font-bold rounded hover:cursor-pointer" 
                    onClick={
                        ()=>{
                               setstat('')
                               setplan(false)
                            
                            }
                        }> 
                        {stat}
                    </div>
                </div>
                <div className="mb-4">
                    <p className="text-md">
                        <span className="font-semibold ">{PlanDetails.name}</span>
                    </p>
                    <p> Phone+Tablet</p>
                </div>
                <div className="mb-4">
                    <span className="text-2xl font-semibold">₹</span>
                    <span className="text-2xl font-semibold">{PlanDetails.price}</span>
                    <span>{PlanDetails.isMonthlySelected? '/Mn' : '/yr'}</span>
                </div>
                <div className="mb-4">
                    <Link to='/plans' className="px-4 py-2 bg-white border border-blue-500 rounded font-semibold hover:bg-gray-200">
                        {
                            plan ? 'Change Plan' : 'Choose Plan'
                        }
                    </Link>
                </div>
                <div className="text-sm opacity-70">
                    Your subscription has <span></span>started on <span className="font-semibold">{date(0,0)}</span> and will auto-renew on <span className="font-semibold">{PlanDetails.isMonthlySelected? date(1,0): date(0,1)}</span>.
                </div>
            </div>
        </div>
    );
};

export default PlanDetails;
