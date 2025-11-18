
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Additional from '@/models/additional';

export async function GET() {
  await dbConnect();

  try {
    const additional = await Additional.findOne({});
    if (!additional) {
      return NextResponse.json({ error: 'Additional info not found' }, { status: 404 });
    }
    return NextResponse.json(additional);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const updatedAdditional = await Additional.findOneAndUpdate({}, body, { new: true, runValidators: true });
    if (!updatedAdditional) {
      return NextResponse.json({ error: 'Additional info not found' }, { status: 404 });
    }
    return NextResponse.json(updatedAdditional);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
