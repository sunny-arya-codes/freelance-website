
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/education';

export async function GET() {
  await dbConnect();

  try {
    const education = await Education.find({}).sort({ order: 1 });
    const educationWithImages = education.map(edu => {
      const obj = edu.toObject();
      if (obj.image && obj.imageType) {
        obj.imageUrl = `data:${obj.imageType};base64,${obj.image}`;
      }
      return obj;
    });
    return NextResponse.json(educationWithImages);
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
