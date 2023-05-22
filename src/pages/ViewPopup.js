import React, { useState } from 'react';

const ViewPopup = ({ student, onClose }) => {
  const [viewStudent, setViewStudent] = useState({ ...student });

  return (
    <div className='bg-white md:w-6/12 w-9/12 m-auto p-6 fixed lg:top-[12%] top-[15%] lg:left-[30%] md:left-[25%] left-[12%] z-50 border-2 border-[#7A9B70] border-solid rounded-lg text-center'>
      <h2 className='font-[poppins] font-bold text-xl'>Student details</h2>
      <div>
        
        <p>Name: {viewStudent.name}</p>
        <p>Email: {viewStudent.email}</p>
        <p>Contact: {viewStudent.contact}</p>
        <p>Fees: {viewStudent.fees}</p>
        <p>Status: {viewStudent.status}</p>
      </div>
      <button className='bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md mt-4' onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ViewPopup;
