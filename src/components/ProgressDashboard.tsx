import React from 'react';

// 1. Define an interface for the component's props.
// Since you pass `null`, we allow the type to be `number | null`.
interface ProgressDashboardProps {
  progress: number | null;
}

// 2. Update the component to accept and use the props.
const ProgressDashboard = ({ progress }: ProgressDashboardProps) => {
  // Use the nullish coalescing operator (??) to default to 0 if progress is null
  const progressValue = progress ?? 0;

  return (
    <div className="w-full">
      <p className="text-sm mb-1">Overall Progress: {progressValue}%</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
