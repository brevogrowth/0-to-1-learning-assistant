import { NextResponse } from 'next/server';

// import { supabase } from '@/lib/supabaseClient'; // Commented out

export async function POST(request: Request) {
  // We still read the data from the request to simulate the action
  const { lessonId, progress } = await request.json();

  // --- MOCK RESPONSE ---
  // The real database call is disabled. We'll log the received data
  // and return a standard success message.
  console.log(`Mock progress update for lesson ${lessonId} with progress:`, progress);

  return NextResponse.json({
    message: 'Progress update mocked successfully',
    lessonId,
    progress,
  });

  /*
  // --- REAL SUPABASE CODE (COMMENTED OUT) ---
  try {
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        lesson_id: lessonId,
        progress: progress,
        // Note: A real implementation would also need a user_id
      })
      .select();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
  */
}