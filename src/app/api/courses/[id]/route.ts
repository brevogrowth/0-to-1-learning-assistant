import { NextResponse } from 'next/server';

// Comment out the Supabase client
// import { supabase } from '@/lib/supabaseClient';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // --- MOCK DATA ---
  // Create a fake course object to return.
  const mockCourse = {
    id: id,
    topic: `Mock API Course Topic for ${id}`,
    description: 'This is a mock course description from the API.',
    lessons: [
      { id: 'lesson-api-1', title: 'API Mock Lesson 1' },
      { id: 'lesson-api-2', title: 'API Mock Lesson 2' },
    ]
  };
  // --- END MOCK DATA ---

  return NextResponse.json(mockCourse);

  /*
  // --- REAL SUPABASE CODE (COMMENTED OUT FOR LATER) ---
  try {
    const { data: course, error } = await supabase
      .from('courses')
      .select('*, lessons(*)')
      .eq('id', id)
      .single();

    if (error || !course) {
      return new NextResponse('Course not found', { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
  */
}