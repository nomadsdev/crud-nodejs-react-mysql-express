import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

import Footer from './App/Footer';

function App() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', occupation: '', salary: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddData = async () => {
    try {
      await axios.post('http://localhost:3001/api/data', formData);
      fetchData();
      setFormData({ name: '', occupation: '', salary: '' });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleUpdateData = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/data/${id}`, formData);
      fetchData();
      setFormData({ name: '', occupation: '', salary: '' });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/data/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-center'>
        <div className='p-10'>
          <h1 className='text-2xl text-indigo-600'>Data Management</h1>
          <div className='bg-indigo-600 w-5 h-1 rounded-full'></div>
        </div>
      </div>
      <div className='flex justify-center'>
        <ul>
          {data.map(item => (
            <li key={item.id} className='shadow-md flex justify-between gap-2 border rounded-md p-2 my-5'>
              <p className='text-zinc-500'><span className='text-blue-500'>{item.name}</span> - <span className='text-rose-500'>{item.occupation}</span> - <span className='text-indigo-500'>{item.salary}</span></p>
              <button onClick={() => handleUpdateData(item.id)} className='bg-yellow-200 text-yellow-500 px-5 rounded-md'>Update</button>
              <button onClick={() => handleDeleteData(item.id)} className='bg-rose-200 text-rose-500 px-5 rounded-md'>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center p-10'>
        <div className='flex gap-2 bg-indigo-500 p-3 rounded-md'>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className='rounded-md pl-2'
          />
          <input
            type="text"
            placeholder="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleInputChange}
            className='rounded-md pl-2'
          />
          <input
            type="text"
            placeholder="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            className='rounded-md pl-2'
          />
          <div>
          <button onClick={handleAddData} className='bg-green-200 text-green-500 px-5 rounded-md py-1 shadow-md'>Add Data</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;