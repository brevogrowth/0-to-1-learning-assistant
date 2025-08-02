import LessonViewer from '@/components/LessonViewer';
import ProgressDashboard from '@/components/ProgressDashboard';

async function getCourse(id: string) {
  const res = await fetch(`http://localhost:3000/api/courses/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  return (
    <div>
      <h1>{course.topic}</h1>
      <ProgressDashboard progress={null} />
      <div>
        {course.lessons.map((lesson: any) => (
          <LessonViewer key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
