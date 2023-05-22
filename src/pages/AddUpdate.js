import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
const AddUpdate = () => {
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    contact: "",
    fees: "5000",
    status: ""
  };
  const [state, setState] = useState(initialState);
  const { name, email, contact, fees, status } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !fees || !status) {
      toast.error("All fields are required");
    } else {
      await addDoc(collection(db, "Student"), { name: name, email: email, contact: contact, fees: fees, status: status })
        .then(() => {
          toast.success("successfully added");
          setTimeout(() => navigate('/'), 1000);
        })
        .catch((error) => {
          toast.error("failed!");
        });

      setState(initialState);
    }
  };
  return (
    <>
      <div className=' mt-10 p-6 flex justify-center border-4  border-[#7A9B70] border-solid md:w-3/6 m-auto w-3/4 rounded-lg  '>
        <div className='text-center'>
          <form onSubmit={handleSubmit} >
            <h1 className='font-bold mb-10'>ADD STUDENT DATA</h1>
            <div className=''>Name</div>
            <input
              className="border-2 border-[#7A9B70] border-solid py-1 md:px-14 px-8 m-4 rounded-md "
              type="text"
              placeholder="Name ..."
              name="name"
              value={name}
              onChange={handleInputChange} />

            <div className=''>Email</div>

            <input
              className="border-2 border-[#7A9B70] border-solid py-1 md:px-14 px-8 m-4 rounded-md"
              type="email"
              placeholder="Email ..."
              name="email"
              value={email}
              onChange={handleInputChange} />

            <div className=''>Contact</div>

            <input
              className="border-2 border-[#7A9B70] border-solid py-1 md:px-14 px-8 m-4 rounded-md"
              type="number"
              placeholder="Contact ..."
              name="contact"
              value={contact}
              onChange={handleInputChange} />

            <div className=''>Fees</div>

            <input
              className="border-2 border-[#7A9B70] border-solid py-1 md:px-14 px-8 m-4 rounded-md"
              type="number"
              placeholder={state.contact}
              name="fees"
              value={fees}
              onChange={handleInputChange} />

            <div className=''>Status</div>

            <input
              className="border-2 border-[#7A9B70] border-solid py-1 md:px-14 px-8 m-4 rounded-md"
              type="text"
              placeholder="Payment Status"
              name="status"
              value={status}
              onChange={handleInputChange} /><br></br>
            <button className="border-2  border-[#7A9B70] px-6 py-2 mx-20 my-4 text-center rounded-md">Submit</button>

          </form>
        </div>

      </div>
    </>
  )
}

export default AddUpdate
