import { notFound } from 'next/navigation';
import ProgressDashboard from '@/components/ProgressDashboard';
import LessonViewer from '@/components/LessonViewer';

// 1. Comment out the Supabase client import
// import { supabase } from '@/lib/supabaseClient';

// Define types locally for our mock data
type Lesson = {
  id: string;
  title: string;
  content: string;
  course_id: string;
  lesson_number: number;
  created_at: string;
};

/*
// 2. Comment out the real data fetching function
async function getCourse(id: string) {
  const { data: course } = await supabase
    .from('courses')
    .select(`
      *,
      lessons ( * )
    `)
    .eq('id', id)
    .single();
  return course;
}
*/

export default async function CoursePage({ params }: { params: { id: string } }) {
  // 3. Use mock data instead of calling the real function
  // const course = await getCourse(params.id);

  const mockCourse = {
    id: params.id,
    topic: `Mock Course for ID ${params.id}`,
    lessons: [
      { id: 'L1', title: 'Mock Lesson 1', content: 'Content for mock lesson 1.', course_id: params.id, lesson_number: 1, created_at: new Date().toISOString() },
      { id: 'L2', title: 'Mock Lesson 2', content: 'Content for mock lesson 2.', course_id: params.id, lesson_number: 2, created_at: new Date().toISOString() },
    ]
  };
  const course = mockCourse;

  if (!course) {
    notFound();
  }

  return (
    <div>
      <h1>{course.topic}</h1>
      <ProgressDashboard progress={null} />
      <div>
        {course.lessons.map((lesson: Lesson) => (
          <LessonViewer key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
