
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Training from '@/models/training';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();
    const updatedTraining = await Training.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedTraining) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTraining);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedTraining = await Training.findByIdAndDelete(id);
    if (!deletedTraining) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Training deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
