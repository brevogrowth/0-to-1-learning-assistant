'use client';

import { useState } from 'react';
import { GraduationCap, Zap, Target, BookOpen } from 'lucide-react';
import { TopicInput } from '@/components/course/TopicInput';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from "@/components/ui/toaster"

/*
// This commented-out function is preserved for future Supabase integration.
async function getCourses() {
  const { data: courses } = await supabase.from('courses').select('*');
  return courses;
}
*/

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTopicSubmit = async (topic: string) => {
    setIsLoading(true);
    
    try {
      // Connect to our existing API endpoint
      const response = await fetch('/api/courses/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'You are a helpful assistant that generates concise course topics.' },
            { role: 'user', content: topic },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to start course generation.');
      }
      
      // Since the API streams the response, we don't need to wait for it here.
      // We can assume success and let the user know.
      toast({
        title: "Course Generation Started!",
        description: `Successfully creating a personalized course on "${topic}"`, 
      });
      
      console.log("Started course generation for:", topic);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Zap, title: "AI-Powered Learning", description: "Get personalized courses tailored to your learning style and pace" },
    { icon: Target, title: "Goal-Oriented", description: "Set clear objectives and track your progress with detailed analytics" },
    { icon: BookOpen, title: "Comprehensive Content", description: "Access curated lessons, exercises, and resources for any topic" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="absolute inset-0 bg-hero-gradient opacity-5" />
        <div className="container mx-auto text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full text-sm text-muted-foreground mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>Personalized AI Learning Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn Anything,
              <span className="bg-hero-gradient bg-clip-text text-transparent"> Anytime</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform any topic into a structured learning experience. Our AI creates personalized courses that adapt to your learning style.
            </p>

            <div className="mb-16">
              <TopicInput onSubmit={handleTopicSubmit} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Learning Assistant?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Experience the future of personalized education with cutting-edge AI technology</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card border-0 bg-card hover:shadow-lg transition-all duration-200 group">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Toaster for notifications */}
      <Toaster />
    </div>
  );
};

export default HomePage;
