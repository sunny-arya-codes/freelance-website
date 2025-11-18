
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Achievement from '@/models/achievement';

export async function GET() {
  await dbConnect();

  try {
    const achievements = await Achievement.find({}).sort({ order: 1 });
    return NextResponse.json(achievements);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const newAchievement = await Achievement.create(body);
    return NextResponse.json(newAchievement, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
