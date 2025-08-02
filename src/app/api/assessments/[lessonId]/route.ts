import { NextRequest, NextResponse } from 'next/server';

// We no longer need the real Supabase client for now
// import { supabase } from '@/lib/supabaseClient';

export async function GET(
  _req: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  const { lessonId } = params;

  // --- MOCK DATA ---
  // Instead of calling the database, we define a fake assessment object.
  // You can customize this data to match what you expect from Supabase.
  const mockAssessment = {
    id: `mock-assessment-for-${lessonId}`,
    lesson_id: lessonId,
    title: "Mock Assessment Title",
    questions: [
      { id: 'q1', text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin'], correct_option: 'Paris' },
      { id: 'q2', text: 'What is 2 + 2?', options: ['3', '4', '5'], correct_option: '4' },
    ],
  };

  // Immediately return the mock data.
  return NextResponse.json(mockAssessment);

  /*
  // --- REAL SUPABASE CODE (COMMENTED OUT FOR LATER) ---
  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('lesson_id', lessonId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
  */
}
