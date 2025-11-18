
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/profile';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const imageFile = files.image;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(imageFile[0].mimetype)) {
      return NextResponse.json({ error: 'Invalid image format. Only JPEG and PNG are allowed.' }, { status: 400 });
    }

    // Move the file to the public/uploads directory
    const oldPath = imageFile[0].filepath;
    const newFileName = `${Date.now()}-${imageFile[0].originalFilename}`;
    const newPath = path.join(process.cwd(), 'public', 'uploads', newFileName);
    await fs.rename(oldPath, newPath);

    const imageUrl = `/uploads/${newFileName}`;

    // Update the profile with the new image URL
    const updatedProfile = await Profile.findOneAndUpdate({}, { high_res_image_url: imageUrl }, { new: true });

    if (!updatedProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
