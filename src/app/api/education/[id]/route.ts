
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/education';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();
    const updatedEducation = await Education.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedEducation) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }
    return NextResponse.json(updatedEducation);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedEducation = await Education.findByIdAndDelete(id);
    if (!deletedEducation) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
