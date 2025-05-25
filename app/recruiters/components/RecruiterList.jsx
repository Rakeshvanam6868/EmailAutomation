'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import EmailComposer from './EmailComposer';

export default function RecruiterList() {
  const { data: recruiters = [], isLoading } = useQuery({
    queryKey: ['recruiters'],
    queryFn: async () => {
      const res = await axios.get('/api/recruiters');
      return res.data;
    }
  });

  // Group recruiters by company
  const groupedRecruiters = recruiters.reduce((acc, rec) => {
    acc[rec.company] = acc[rec.company] || [];
    acc[rec.company].push(rec);
    return acc;
  }, {});

  const companies = Object.keys(groupedRecruiters);

  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  if (isLoading) return <p>Loading recruiters...</p>;

  return (
    <div className="space-y-6 text-black">
      {companies.map(company => (
        <div key={company}>
          <h3 className="text-xl font-semibold mb-2">{company}</h3>
          <ul className="space-y-2">
            {groupedRecruiters[company].map(recruiter => (
              <li key={recruiter.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
                <span>{recruiter.name} - {recruiter.email}</span>
                <button
                  onClick={() => setSelectedRecruiter(recruiter)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Send Email
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selectedRecruiter && (
        <EmailComposer
          recruiter={selectedRecruiter}
          onClose={() => setSelectedRecruiter(null)}
        />
      )}
    </div>
  );
}