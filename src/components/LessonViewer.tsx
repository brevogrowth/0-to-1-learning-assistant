export default function LessonViewer({ lesson }: { lesson: any }) {
  return (
    <div>
      <h2>{lesson.title}</h2>
      <p>{lesson.content}</p>
    </div>
  );
}
