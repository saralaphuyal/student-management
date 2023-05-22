import React, { useState } from 'react';

const UpdatePopup = ({ student, onUpdate, onClose,index }) => {
  const [updatedStudent, setUpdatedStudent] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(index, updatedStudent);
  };

  return (
    <div className='bg-white md:w-6/12 w-9/12 m-auto p-6 fixed lg:top-[12%] top-[15%]  lg:left-[30%] md:left-[25%] left-[12%] z-50 border-2  border-[#7A9B70] border-solid rounded-lg text-center '>
      <h2 className='font-[poppins] font-bold text-xl'>Edit Student</h2>
      
        <div className=''>Name</div>
        <input type="text" name="name" value={updatedStudent.name} onChange={handleChange}    className="border-2 border-[#7A9B70] border-solid py-1 md:px-8 px-3 my-2 rounded-md "/>
    
        <div className=''>Email</div>
       
        <input type="email" name="email" value={updatedStudent.email} onChange={handleChange} className="border-2 border-[#7A9B70] border-solid py-1 md:px-8 px-3 my-2 rounded-md " />
      
      <div>
      <div className=''>Contact</div>
      
        <input type="text" name="contact" value={updatedStudent.contact} onChange={handleChange} className="border-2 border-[#7A9B70] border-solid py-1 md:px-8 px-3 my-2 rounded-md " />
      </div>
      <div>
      <div className=''>Fees</div>
 
        <input type="text" name="fees" value={updatedStudent.fees} onChange={handleChange} className="border-2 border-[#7A9B70] border-solid py-1 md:px-8 px-3 my-2 rounded-md " />
      </div>
      <div>
      <div className=''>Status</div>

        <input type="text" name="status" value={updatedStudent.status} onChange={handleChange} className="border-2 border-[#7A9B70] border-solid py-1 md:px-8 px-3 my-2 rounded-md " />
      </div>
      <button className="border-2 border-[#00039D] border-solid py-1 md:px-6 px-3 m-2 rounded-md " onClick={handleUpdate}>Update</button>
      <button className="border-2 border-red-500 border-solid py-1 md:px-6 px-3 m-2 rounded-md " onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UpdatePopup;
