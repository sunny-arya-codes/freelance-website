
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/experience';

export async function GET() {
  await dbConnect();

  try {
    const experiences = await Experience.find({}).sort({ order: 1 });
    const experiencesWithImages = experiences.map(exp => {
      const obj = exp.toObject();
      if (obj.image && obj.imageType) {
        obj.imageUrl = `data:${obj.imageType};base64,${obj.image}`;
      }
      return obj;
    });
    return NextResponse.json(experiencesWithImages);
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
