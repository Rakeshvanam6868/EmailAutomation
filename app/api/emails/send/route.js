// app/api/emails/send/route.js
import prisma from '@/lib/prisma';
import { getDefaultEmailContent } from '@/utils/emailTemplate';
import { sendEmail } from '@/utils/sendEmail';

export async function POST(req) {
  try {
    const body = await req.json();
    const { recruiterId, subject, body: customBody } = body;

    if (!recruiterId) {
      return Response.json({ error: 'Missing recruiter ID' }, { status: 400 });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { id: recruiterId }
    });

    if (!recruiter) {
      return Response.json({ error: 'Recruiter not found' }, { status: 404 });
    }

    const user = await prisma.user.findFirst();

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    const html = customBody || getDefaultEmailContent(recruiter, user);
    const emailSubject = subject || `Full Stack Developer Application - ${recruiter.company}`;

    // Send email
    await sendEmail({
      to: recruiter.email,
      subject: emailSubject,
      html
    });

    // Log success
    await prisma.emailLog.create({
      data: {
        recruiterId,
        userId: user.id,
        subject: emailSubject,
        body: html,
        status: 'sent'
      }
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err.message);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}