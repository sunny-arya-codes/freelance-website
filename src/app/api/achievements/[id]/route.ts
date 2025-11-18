
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Achievement from '@/models/achievement';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();
    const updatedAchievement = await Achievement.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedAchievement) {
      return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
    }
    return NextResponse.json(updatedAchievement);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedAchievement = await Achievement.findByIdAndDelete(id);
    if (!deletedAchievement) {
      return NextResponse.json({ error: 'Achievement not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
