'use client';
import { useState } from 'react';
import axios from 'axios';

export default function RecruiterForm({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/recruiters', { name, email, company });
      onAdd(res.data);
      setName('');
      setEmail('');
      setCompany('');
    } catch (err) {
      alert('Error adding recruiter.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded text-black"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded text-black"
        />
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="border p-2 rounded text-black"
        />
      </div>
      <button
        type="submit"
        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Add Recruiter
      </button>
    </form>
  );
}