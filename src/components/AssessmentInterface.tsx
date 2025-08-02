import { Assessment } from '@/types';

export default function AssessmentInterface({ assessment }: { assessment: Assessment }) {
  return (
    <div>
      <h4>{assessment.question}</h4>
      {/* Display assessment options and handle submission */}
    </div>
  );
}