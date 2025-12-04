
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/profile';

export async function GET() {
  try {
    await dbConnect();

    const profile = await Profile.findOne({});

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found. Please create a profile from the admin panel.' },
        { status: 404 }
      );
    }

    // Convert Base64 image to data URL if exists
    const profileData = profile.toObject();
    if (profileData.image && profileData.imageType) {
      profileData.imageUrl = `data:${profileData.imageType};base64,${profileData.image}`;
    }

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error in GET /api/profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );

    // Convert Base64 image to data URL if exists
    const profileData = updatedProfile.toObject();
    if (profileData.image && profileData.imageType) {
      profileData.imageUrl = `data:${profileData.imageType};base64,${profileData.image}`;
    }

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
