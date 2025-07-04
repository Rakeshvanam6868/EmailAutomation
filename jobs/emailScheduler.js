// jobs/emailScheduler.js
import prisma from '@/lib/prisma';
import { sendEmail } from '@/utils/sendEmail';
import { getDefaultEmailContent } from '@/utils/emailTemplate';

export async function scheduleOneTimeEmailJob() {
  console.log('🔁 Running one-time email job (no time window)...');

  const user = await prisma.user.findFirst();
  if (!user) throw new Error('❌ No user found');

  const recruiters = await prisma.recruiter.findMany({
    where: {
      logs: {
        none: {} // Recruiters with no email logs yet
      }
    },
    include: { logs: true }
  });

  if (recruiters.length === 0) {
    console.log('✅ All recruiters have already received emails.');
    return;
  }

  for (const rec of recruiters) {
    const subject = rec.isEmailCustomized
      ? rec.customSubject
      : `Frontend Developer Application - ${rec.company}`;
    const body = rec.isEmailCustomized
      ? rec.customBody
      : getDefaultEmailContent(rec, user);

    try {
      await sendEmail({ to: rec.email, subject, html: body });

      await prisma.emailLog.create({
        data: {
          recruiterId: rec.id,
          userId: user.id,
          subject,
          body,
          status: 'sent',
        },
      });

      console.log(`✅ Email sent to ${rec.email}`);
    } catch (err) {
      await prisma.emailLog.create({
        data: {
          recruiterId: rec.id,
          userId: user.id,
          subject,
          body,
          status: 'failed',
        },
      });

      console.error(`❌ Failed to send to ${rec.email}:`, err.message);
    }
  }
}
