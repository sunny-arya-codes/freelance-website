
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/experience';

export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { ordered_ids } = await req.json();

    if (!Array.isArray(ordered_ids)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const bulkOps = ordered_ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index + 1 } },
      },
    }));

    await Experience.bulkWrite(bulkOps);

    return NextResponse.json({ message: 'Experience order updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
