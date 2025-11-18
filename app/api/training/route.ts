
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Training from '@/models/training';

export async function GET() {
  await dbConnect();

  try {
    const trainings = await Training.find({}).sort({ order: 1 });
    return NextResponse.json(trainings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newTraining = await Training.create(body);
    return NextResponse.json(newTraining, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
