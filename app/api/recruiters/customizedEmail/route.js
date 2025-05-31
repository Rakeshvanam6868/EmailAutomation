import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { recruiterId, subject, body: emailBody } = body;

    if (!recruiterId || !subject || !emailBody) {
      return Response.json(
        { error: 'Missing required fields: recruiterId, subject, or body' },
        { status: 400 }
      );
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

    // Update custom email fields
    const updatedRecruiter = await prisma.recruiter.update({
      where: { id: parsedRecruiterId },
      data: {
        isEmailCustomized: true,
        customSubject: subject.trim(),
        customBody: emailBody.trim(),
      },
    });

    return Response.json(
      { message: 'Custom email saved successfully', recruiter: updatedRecruiter },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error saving custom email:', err.message);
    return Response.json(
      { error: 'Failed to save custom email due to internal server error' },
      { status: 500 }
    );
  }
}