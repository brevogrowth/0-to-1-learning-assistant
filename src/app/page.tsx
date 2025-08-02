import CourseCard from '@/components/CourseCard';
import { Course } from '@/types'; // Import the type for our mock data

// Comment out the Supabase client
// import { supabase } from '@/lib/supabaseClient';

/*
// REAL DATA FETCHING (COMMENTED OUT FOR LATER)
async function getCourses() {
  const { data: courses } = await supabase.from('courses').select('*');
  return courses;
}
*/

export default async function HomePage() {
  // const courses = await getCourses(); // Real function call is commented out

  // --- MOCK DATA ---
  // Create a fake array of courses
  const mockCourses: Course[] = [
    { id: '1', topic: 'Introduction to Mock Data', description: 'Learn how to use mock data to build and test your applications without a database.', duration: 0, created_at: '', user_id: '', lessons: [] },
    { id: '2', topic: 'Advanced TypeScript', description: 'Deep dive into advanced TypeScript features and best practices.', duration: 0, created_at: '', user_id: '', lessons: [] },
    { id: '3', topic: 'React Best Practices', description: 'Explore patterns and techniques for writing clean, maintainable React code.', duration: 0, created_at: '', user_id: '', lessons: [] },
  ];
  const courses = mockCourses;
  // --- END MOCK DATA ---

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}