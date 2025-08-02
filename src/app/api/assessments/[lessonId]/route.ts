import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(
  req: NextRequest,
  context: { params: { lessonId: string } }
) {
  const { lessonId } = context.params;

  if (!lessonId) {
    return NextResponse.json({ error: 'Missing lesson ID' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('lesson_id', lessonId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Not found
        return NextResponse.json({ error: 'Assessment not found' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}