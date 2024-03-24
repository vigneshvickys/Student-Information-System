import React from 'react';
import { Power } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const FixedHeader = ({ title }) => {
  const navigate = useNavigate();
  const Logout=()=>{
  
      localStorage.removeItem('token');
      navigate('/login');
    
  }
  return (
    <div className="fixed top-0 w-full bg-white shadow-md">
      <div className="mx-auto header flex items-center justify-center">
        <div className='w-[100rem]'>
        <h1 className="text-2xl font-bold text-white custom-font text-center">{title}</h1>
        
        </div>
        
        <Power className="text-white custom-font ml-auto mr-10 cursor-pointer" size={30} onClick={()=>{Logout()}}/>
      </div>
    </div>
  );
};

export default FixedHeader;
