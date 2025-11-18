import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Achievement from '@/models/achievement';

export const dynamic = 'force-dynamic';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // TypeScript ke hisaab se
) {
  await dbConnect();

  try {
    const { id } = await context.params;     // params ko await kar rahe
    const body = await req.json();          // request body yahan se aayega

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedAchievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedAchievement);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await context.params;

    const deletedAchievement = await Achievement.findByIdAndDelete(id);

    if (!deletedAchievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Achievement deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
