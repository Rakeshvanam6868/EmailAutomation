import prisma from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const recruiterId = searchParams.get('recruiterId');

  let logs;
  if (recruiterId) {
    logs = await prisma.emailLog.findMany({
      where: { recruiterId: parseInt(recruiterId) },
      include: { recruiter: true, user: true }
    });
  } else {
    logs = await prisma.emailLog.findMany({
      include: { recruiter: true, user: true }
    });
  }

  return Response.json(logs);
}