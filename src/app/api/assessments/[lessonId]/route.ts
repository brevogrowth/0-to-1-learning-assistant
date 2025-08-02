import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  _req: NextRequest, // Prefixed with _ as it's unused
  { params }: { params: { lessonId: string } }
) {
  const { lessonId } = params;

  // This check is technically not needed since a matching route
  // guarantees lessonId exists, but it doesn't hurt.
  if (!lessonId) {
    return NextResponse.json({ error: 'Missing lesson ID' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('lesson_id', lessonId)
      .single(); // .single() correctly throws an error if 0 or >1 rows are found

    if (error) {
      // Handle the case where no assessment is found
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
      }
      // For any other database error, re-throw it to be caught by the catch block
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    //  Log the actual error to the server console for debugging
    console.error('Error fetching assessment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
