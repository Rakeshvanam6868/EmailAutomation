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

    const parsedRecruiterId = parseInt(recruiterId, 10);
    if (isNaN(parsedRecruiterId)) {
      return Response.json({ error: 'Invalid recruiter ID' }, { status: 400 });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { id: parsedRecruiterId },
    });

    if (!recruiter) {
      return Response.json({ error: 'Recruiter not found' }, { status: 404 });
    }

    const user = await prisma.user.findFirst();

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // Use custom email if set; fallback to provided or default
    const html =
      (recruiter.isEmailCustomized ? recruiter.customBody : null) ||
      customBody ||
      getDefaultEmailContent(recruiter, user);

    const emailSubject =
      (recruiter.isEmailCustomized ? recruiter.customSubject : null) ||
      subject ||
      `Full Stack Developer Application - ${recruiter.company}`;

    // Send the actual email
    await sendEmail({
      to: recruiter.email,
      subject: emailSubject,
      html,
    });

    // Log success in DB
    await prisma.emailLog.create({
      data: {
        recruiterId: parsedRecruiterId,
        userId: user.id,
        subject: emailSubject,
        body: html,
        status: 'sent',
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err.message);
    return Response.json(
      { error: 'Failed to send email due to internal server error' },
      { status: 500 }
    );
  }
}