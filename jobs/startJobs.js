// app/page.js
import { useEffect } from 'react';
import { scheduleEmailJob } from '@/jobs/emailScheduler';
import { fetchAndAddRecruiters } from '@/services/recruiterFetcher';

if (typeof window === 'undefined') {
  scheduleEmailJob();

  setInterval(async () => {
    console.log('Running daily recruiter fetch...');
    // await fetchAndAddRecruiters();
  }, 24 * 60 * 60 * 1000); // Every 24 hours
}

export default function startJobs() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Email Automation Backend Running</h1>
    </div>
  );
}