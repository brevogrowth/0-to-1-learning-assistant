import React from 'react';
import Link from 'next/link';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-2">{course.topic}</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <Link href={`/courses/${course.id}`} className="text-blue-500 hover:underline">
        View Course
      </Link>
    </div>
  );
};

export default CourseCard;
