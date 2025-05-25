'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function DashboardPage() {
  const { data: recruiters = [], isLoading: loadingRecruiters } = useQuery({
    queryKey: ['recruiters'],
    queryFn: async () => {
      const res = await axios.get('/api/recruiters');
      return res.data;
    }
  });

  const { data: logs = [], isLoading: loadingLogs } = useQuery({
    queryKey: ['emailLogs'],
    queryFn: async () => {
      const res = await axios.get('/api/logs');
      return res.data;
    }
  });

  if (loadingRecruiters || loadingLogs) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-medium mb-2">Recruiters ({recruiters.length})</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recruiters.map(r => (
              <li key={r.id}>{r.name} - {r.company}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium mb-2">Recent Logs ({logs.length})</h3>
          <ul className="space-y-2">
            {logs.map(log => (
              <li key={log.id} className="bg-white text-black p-2 rounded shadow">
                Sent to {log.recruiter?.name} at {new Date(log.sentAt).toLocaleString()} - <strong>{log.status}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}