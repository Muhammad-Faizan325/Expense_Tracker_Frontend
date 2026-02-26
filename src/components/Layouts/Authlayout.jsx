import React from 'react';
import Card_2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className='flex min-h-screen bg-white overflow-hidden'>
  
      <div className='w-full lg:w-[55vw] px-6 sm:px-12 lg:px-20 py-10 flex flex-col'>
        
        <div className='flex items-center gap-3 shrink-0'>
            <div className='w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200'>
                <div className='w-2.5 h-2.5 bg-white rounded-full' />
            </div>
            <h2 className='text-xl font-bold text-slate-800 tracking-tighter italic '>
              EXPENSE<span className='text-purple-600 not-italic'>TRACKER</span>
            </h2>
        </div>
        
        {/* YAHAN DEKHO: mt-16 ko mt-6 kar diya hai taake space khatam ho jaye */}
        <div className="max-w-[480px] w-full mt-6 sm:mt-8">
            {children}
        </div>

        <div className='mt-auto pt-10'>
          <p className='text-xs text-slate-400 text-center lg:text-left'>
              © 2026 Expense Tracker. All rights reserved.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-[45vw] bg-slate-50 relative flex-col justify-center items-center p-12 overflow-hidden">
        <div className='absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl opacity-50' />
        
        <div className='z-20 w-full max-w-sm mb-12'>
          <StatsInfocard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="$430,000"
            color="bg-gradient-to-tr from-purple-500 to-violet-600" 
          />
        </div>

        <div className='relative z-10 w-full max-w-md'>
            <img 
              src={Card_2} 
              alt="Dashboard Preview"
              className='w-full shadow-2xl rounded-2xl border border-white' 
            />
        </div>
      </div>
    </div>
  );
};

const StatsInfocard = ({ icon, label, value, color }) => {
  return (
    <div className='flex items-center gap-5 bg-white p-5 rounded-3xl shadow-sm border border-gray-100 w-full'>
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-2xl shadow-lg`}>
        {icon}
      </div>
      <div>
        <h6 className='text-[13px] font-medium text-slate-500 mb-0.5'>{label}</h6>
        <span className='text-2xl font-black text-slate-800 tracking-tight'>{value}</span>
      </div>
    </div>
  );
};

export default AuthLayout;

