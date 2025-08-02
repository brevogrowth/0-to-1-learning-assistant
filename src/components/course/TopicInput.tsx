'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

export const TopicInput = ({ onSubmit, isLoading }: TopicInputProps) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto flex items-center space-x-2 p-2 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg"
    >
      <Search className="h-5 w-5 ml-3 text-muted-foreground" />
      <Input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="What do you want to learn about today?"
        className="flex-grow bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading} className="rounded-full">
        {isLoading ? 'Generating...' : 'Create Course'}
      </Button>
    </form>
  );
};