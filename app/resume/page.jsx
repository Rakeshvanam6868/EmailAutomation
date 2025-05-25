'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ResumePage() {
  const [email, setEmail] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user', { email, resumeLink });
      alert('Resume updated successfully!');
    } catch (error) {
      alert('Failed to update resume.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Resume Link</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">User Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-gray-900 bg-slate-200 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Resume Link</label>
          <input
            type="url"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            required
            className="w-full border-gray-900 bg-slate-200 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
        >
          Update Resume
        </button>
      </form>
    </div>
  );
}