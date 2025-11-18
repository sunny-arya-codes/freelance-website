
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/profile';

// Mock profile data to use when database is not available
const MOCK_PROFILE = {
  name: "Sunny Kumar",
  title: "Full Stack Developer",
  location: "Your Location",
  contact: {
    email: "your.email@example.com",
    phone: "+1234567890",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    portfolio: "https://yourportfolio.com"
  },
  summary: "A passionate developer with experience in building web applications...",
  high_res_image_url: "/images/profile.jpg"
};

export async function GET() {
  try {
    await dbConnect();
    
    // In development, if using mock connection, return mock data
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI) {
      console.warn('Using mock profile data in development mode');
      return NextResponse.json(MOCK_PROFILE);
    }

    try {
      const profile = await Profile.findOne({});
      if (!profile) {
        console.log('No profile found in database, using mock data');
        return NextResponse.json(MOCK_PROFILE);
      }
      return NextResponse.json(profile);
    } catch (dbError) {
      console.error('Database query error:', dbError);
      // In development, return mock data if database query fails
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock profile data');
        return NextResponse.json(MOCK_PROFILE);
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error in GET /api/profile:', error);
    // In production, only return error if not in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: 'Failed to fetch profile', message: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }
    // In development, return mock data even on error
    console.warn('Error in development, returning mock data');
    return NextResponse.json(MOCK_PROFILE);
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // In development with mock connection, just return the updated data
    if (process.env.NODE_ENV === 'development' && !process.env.MONGODB_URI) {
      console.warn('Mock update in development mode');
      return NextResponse.json({ ...MOCK_PROFILE, ...body });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      body,
      { new: true, upsert: true, runValidators: true }
    );
    
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
