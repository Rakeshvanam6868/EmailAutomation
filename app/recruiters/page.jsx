'use client';
import RecruiterForm from './components/RecruiterForm';
import RecruiterList from './components/RecruiterList';
import { useState } from 'react';
import axios from 'axios';

export default function RecruitersPage() {
  const [recruiters, setRecruiters] = useState([]);

  const handleAdd = (newRecruiter) => {
    setRecruiters(prev => [...prev, newRecruiter]);
  };

  const triggerFetch = async () => {
    try {
    //   await axios.put('/api/recruiters');
      alert('Successfully fetched recruiters from Apollo!');
    } catch (err) {
      alert('Failed to fetch recruiters.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Recruiters</h2>
      {/* <button
        onClick={triggerFetch}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded mb-4"
      >
        Fetch From Apollo
      </button> */}
      <RecruiterForm onAdd={handleAdd} />
      <h3 className="text-xl font-semibold mt-6 mb-2">Recruiters List</h3>
      <RecruiterList />
    </div>
  );
}