import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { userId, lessonId, completed } = await req.json();

  if (!userId || !lessonId || completed === undefined) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await supabase
    .from('user_progress')
    .upsert({ user_id: userId, lesson_id: lessonId, completed }, { onConflict: 'user_id,lesson_id' });

  if (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
