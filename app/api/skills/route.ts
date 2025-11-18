
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/skill';

export async function GET() {
  await dbConnect();

  try {
    const skills = await Skill.find({});
    return NextResponse.json(skills);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newSkill = await Skill.create(body);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
