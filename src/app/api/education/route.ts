
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/education';

export async function GET() {
  await dbConnect();

  try {
    const education = await Education.find({}).sort({ order: 1 });
    return NextResponse.json(education);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newEducation = await Education.create(body);
    return NextResponse.json(newEducation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
