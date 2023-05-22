import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Search = () => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('contact');

  useEffect(() => {
    if (search) {
      searchData();
    }
  }, [search]);

  const searchData = async () => {
    const dbRef = collection(db, 'Student');
    const q = query(dbRef, where('contact', '==', search));

    try {
      const querySnapshot = await getDocs(q);
      const documentData = [];

      querySnapshot.forEach((doc) => {
        documentData.push({ id: doc.id, ...doc.data() });
      });

      setData(documentData);
    } catch (error) {
      console.error('Error searching for contact:', error);
    }
  };

  return (
    <>
      {data ? (
        data.length > 0 ? (
            <div className='my-6  w-10/12 m-auto'>
            <h1 className='text-center p-4 font-bold uppercase font-[Roboto] text-2xl'>Student Record</h1>
           
            
            <div  className="overflow-x-auto ">
            <table className="table-auto w-full">
              <thead>
                <tr className='bg-[#7A9B70] text-white'>
                <th className="px-4 py-2 border">No.</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Contact</th>
                  <th className="px-4 py-2 border">Fees</th>
                  <th className="px-4 py-2 border">Status</th>
               
                </tr>
              </thead>
              <tbody>
                {data?.map((element,id) => (
                  <tr key={id}>
                    <td className="border  text-center">{id+1}</td>
                    <td className="border px-6 py-2 text-center capitalize">{element.name}</td>
                    <td className="border  text-center">{element.email}</td>
                    <td className="border text-center">{element.contact}</td>
                    <td className="border  text-center">{element.fees}</td>
                    <td className="border  text-center capitalize">{element.status}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        
        
        
        
          </div>
        ) : (
          <p className='text-center  m-10 font-bold text-2xl'>No matching contacts found.</p>
        )
      ) : (
        <p className='text-center  m-10 font-bold text-2xl'>Loading...</p>
      )}
    
    
  </>
  );
};

export default Search;
