import React, { useState, useEffect,useMemo } from 'react';
import { db } from '../firebase';
import { collection, getDocs,doc, deleteDoc,updateDoc, query, where  } from 'firebase/firestore';
import { toast } from 'react-toastify';
import UpdatePopup from './UpdatePopup';
import ViewPopup from './ViewPopup';
const Home = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const[sortOrder,setSortOrder] = useState(false);

  const [sortCriteria, setSortCriteria] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Student'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(data);
    };
  
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'Student'));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setStudents(data);
  };

  const handleDelete = async (index) => {
    try {
      const studentId = students[index].id; 
      const studentRef = doc(db, 'Student', studentId);
      await deleteDoc(studentRef);
      toast.success('successfully deleted!');
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
    } catch (error) {
      toast.error('Error deleting document:', error);
    }
  };
  
  const handleEdit = (student) => {
    setEditStudent(student);
  };
  
  const handleUpdate = async (index, updatedData) => {
    try {
      const studentId = students[index].id;
      const studentRef = doc(db, 'Student', studentId);
      await updateDoc(studentRef, updatedData);
      toast.success('Successfully updated!');
      setEditStudent(null);
      fetchData(); 
    } catch (error) {
      toast.error('Error updating document:', error);
    }
  };
  const handleView = (student) => {
    setViewStudent(student);
  };

  const filteredData = useMemo(() => {
    let data = students;
  
    if (statusFilter !== null) {
      const lowercaseStatusFilter = statusFilter.toLowerCase();
      data = data.filter(
        (student) => student.status.toLowerCase() === lowercaseStatusFilter
      );
    }
  
    if (sortCriteria === 'Name') {
      data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortCriteria === 'Email') {
      data.sort((a, b) => {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        if (emailA < emailB) return sortOrder === 'asc' ? -1 : 1;
        if (emailA > emailB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortCriteria === 'Contact') {
      data.sort((a, b) => {
        const contactA = a.contact.toLowerCase();
        const contactB = b.contact.toLowerCase();
        if (contactA < contactB) return sortOrder === 'asc' ? -1 : 1;
        if (contactA > contactB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortCriteria === 'Fees') {
      data.sort((a, b) => {
        // Add your sorting logic for fees field here
        // Assuming fees is a numeric field
        return sortOrder === 'asc' ? a.fees - b.fees : b.fees - a.fees;
      });
    } else if (sortCriteria === 'Status') {
      data.sort((a, b) => {
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();
        if (statusA < statusB) return sortOrder === 'asc' ? -1 : 1;
        if (statusA > statusB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
  
    return data;
  }, [statusFilter, students, sortCriteria, sortOrder]);
  
  

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  

  const handlePaidClick = () => {
    setStatusFilter('Paid');
  };

  const handleUnpaidClick = () => {
    setStatusFilter('Unpaid');
  };

  const handleResetClick = () => {
    setStatusFilter(null);
  };
  return (
    <div className='my-6  w-10/12 m-auto'>
      <h1 className='text-center p-4 font-bold uppercase font-[Roboto] text-2xl'>Student List</h1>
      <div className='flex md:flex-row flex-col justify-center align-center'>
      <div className='flex justify-center align-center m-4 '>
      <h1 className='p-2'>Sort By:</h1>
      <form className="border-2  border-[#7A9B70] p-1   text-center rounded-md">
      
  <select  onChange={(e) => setSortCriteria(e.target.value)}>
    <option>Select any....</option>
    <option >Name</option>
    <option >Email</option>
    <option >Contact</option>
    <option >Fees</option>
    <option >Status</option>
  </select>
      </form>
      <button
          className='border-2 px-2 py-1 m-1 text-center rounded-md border-[#7A9B70]'
          onClick={handleSortOrderChange}
        >
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className='flex justify-center align-center m-4'>
      <h1 className='p-2'>Status:</h1>
      <button
            className='border-2 px-6 py-1 m-1 text-center rounded-md border-[#7A9B70]'
            onClick={handlePaidClick}
          >
            Paid
          </button>
          <button
            className='border-2 px-4 py-1 m-1 text-center rounded-md border-[#7A9B70]'
            onClick={handleUnpaidClick}
          >
            Unpaid
          </button>
          <button
            className='border-2 px-5 py-1 text-center rounded-md border-[#7A9B70] m-1'
            onClick={handleResetClick}
          >
            Reset
          </button>
      </div>
      </div>
      
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
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((element, id) => (
            <tr key={id}>
              <td className="border  text-center">{id+1}</td>
              <td className="border px-6 py-2 text-center capitalize">{element.name}</td>
              <td className="border  text-center">{element.email}</td>
              <td className="border text-center">{element.contact}</td>
              <td className="border  text-center">{element.fees}</td>
              <td className="border  text-center capitalize">{element.status}</td>
              <td className="border text-center">
                <button className='md:p-4 p-3 text-blue-900 text-xl'  onClick={() => handleEdit(element, id)}><ion-icon name="create-outline"></ion-icon></button>
                <button className='md:p-3 p-3 text-red-500 text-xl' onClick={()=> handleDelete(id)}><ion-icon name="trash-outline"></ion-icon></button>
                <button className='md:p-3 p-3 text-green-900 text-xl' onClick={() => handleView(element)}><ion-icon name="eye-outline"></ion-icon></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

<div>
{viewStudent && (
        <ViewPopup student={viewStudent} onClose={() => setViewStudent(null)} />
      )}
</div>
      {editStudent && (
      <UpdatePopup
      student={editStudent}
      onUpdate={handleUpdate}
      onClose={() => setEditStudent(null)}
      index={students.indexOf(editStudent)} 
    />
      )}


    </div>
  )
;};

export default Home;

