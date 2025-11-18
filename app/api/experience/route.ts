
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/experience';

export async function GET() {
  await dbConnect();

  try {
    const experiences = await Experience.find({}).sort({ order: 1 });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newExperience = await Experience.create(body);
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
