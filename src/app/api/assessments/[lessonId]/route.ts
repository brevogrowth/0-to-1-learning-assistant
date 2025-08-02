import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface Context {
  params: { lessonId: string };
}

export async function GET(req: NextRequest, context: Context) {
  const { lessonId } = context.params;

  if (!lessonId) {
    return NextResponse.json({ error: 'Missing lesson ID' }, { status: 400 });
  }

  const { data: assessments, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('lesson_id', lessonId);

  if (error) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json({ error: 'Failed to fetch assessments' }, { status: 500 });
  }

  return NextResponse.json(assessments);
}