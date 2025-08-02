export interface Course {
  id: string;
  topic: string;
  duration: number;
  created_at: string;
  user_id: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  lesson_number: number;
  created_at: string;
}

export interface Assessment {
  id: string;
  lesson_id: string;
  question: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation?: string;
  created_at: string;
}
