import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { topic, duration, userId } = await req.json();

  if (!topic || !duration || !userId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `Create a comprehensive ${topic} course with 30min lessons to create a ${duration} hour course. Each lesson should include: title, learning objectives, detailed content, key concepts, and practice questions. Format the output as a JSON object with a "lessons" array.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const courseData = JSON.parse(text);

    const { data: course, error: courseError } = await supabase
      .from('courses')
      .insert({ topic, duration, user_id: userId })
      .select('id')
      .single();

    if (courseError) throw courseError;

    const lessons = courseData.lessons.map((lesson: any, index: number) => ({
      course_id: course!.id,
      title: lesson.title,
      content: lesson.detailed_content,
      lesson_number: index + 1,
    }));

    const { error: lessonsError } = await supabase.from('lessons').insert(lessons);

    if (lessonsError) throw lessonsError;

    return NextResponse.json({ courseId: course!.id });
  } catch (error) {
    console.error('Error generating course:', error);
    return NextResponse.json({ error: 'Failed to generate course' }, { status: 500 });
  }
}
