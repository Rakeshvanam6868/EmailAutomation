// ✅ CORRECT for App Router in /app/api/run-email-job/route.js
import { scheduleOneTimeEmailJob } from '@/jobs/emailScheduler';

export async function GET() {
  try {
    await scheduleOneTimeEmailJob();
    return Response.json({ message: '✅ Email job executed' });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
