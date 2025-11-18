
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/education';

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

    await Education.bulkWrite(bulkOps);

    return NextResponse.json({ message: 'Education order updated successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
