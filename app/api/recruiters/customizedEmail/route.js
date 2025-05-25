import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { recruiterId, subject, body } = req.body;

    await prisma.recruiter.update({
      where: { id: recruiterId },
      data: {
        isEmailCustomized: true,
        customSubject: subject,
        customBody: body,
      },
    });

    res.status(200).json({ message: 'Custom email saved' });
  } else {
    res.status(405).end();
  }
}
