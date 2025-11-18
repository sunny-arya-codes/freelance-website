
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/profile';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid image format. Only JPEG and PNG are allowed.' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique filename
    const filename = `${uuidv4()}-${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, filename);
    
    // Ensure upload directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Save the file
    await writeFile(filePath, buffer);
    
    // Generate the public URL
    const imageUrl = `/uploads/${filename}`;

    try {
      const profile = await Profile.findOneAndUpdate(
        {},
        { image: imageUrl },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );

      return NextResponse.json({ success: true, imageUrl });
    } catch (dbError) {
      // If database update fails, clean up the uploaded file
      try {
        await unlink(filePath);
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded file:', cleanupError);
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Error processing image upload' },
      { status: 500 }
    );
  }
}
