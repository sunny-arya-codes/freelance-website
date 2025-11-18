
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/skill';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();
    const updatedSkill = await Skill.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedSkill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    return NextResponse.json(updatedSkill);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
