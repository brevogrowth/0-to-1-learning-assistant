import { useState } from 'react';

export default function CourseCreationForm() {
  const [topic, setTopic] = useState('');
  const [duration, setDuration] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call the API to generate the course
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic" />
      <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
        <option value={5}>5 hours</option>
        <option value={10}>10 hours</option>
        <option value={20}>20 hours</option>
      </select>
      <button type="submit">Generate Course</button>
    </form>
  );
}
