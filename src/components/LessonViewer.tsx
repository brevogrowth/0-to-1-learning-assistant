import { Lesson } from '@/types';

export default function LessonViewer({ lesson }: { lesson: Lesson }) {
  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
}