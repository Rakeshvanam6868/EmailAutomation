import prisma from '@/lib/prisma';
// import { fetchAndAddRecruiters } from '@/services/recruiterFetcher';

export async function POST(req) {
  const body = await req.json();
  const { name, email, company } = body;

  if (!name || !email || !company) {
    return Response.json({ error: 'All fields are required' }, { status: 400 });
  }

  const existing = await prisma.recruiter.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: 'Email already exists' }, { status: 400 });
  }

  const recruiter = await prisma.recruiter.create({
    data: { name, email, company }
  });

  return Response.json(recruiter, { status: 201 });
}

export async function GET() {
  const recruiters = await prisma.recruiter.findMany();
  return Response.json(recruiters);
}

export async function PUT() {
//   await fetchAndAddRecruiters();
  return Response.json({ message: 'Recruiters fetched and added.' });
}