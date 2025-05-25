import prisma from '@/lib/prisma';

export async function PUT(req) {
  const body = await req.json();
  const { email, resumeLink } = body;

  const user = await prisma.user.upsert({
    where: { email },
    update: { resumeLink },
    create: { email, resumeLink }
  });

  return Response.json(user);
}

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}