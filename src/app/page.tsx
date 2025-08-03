'use client';

import { useState } from "react";
import { GraduationCap, Zap, Target, BookOpen, PlusCircle, Sparkles, Users } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Toaster, toast } from 'sonner';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');

  const handleTopicSubmit = async () => {
    setIsLoading(true);
    const topic = `${courseTitle}: ${courseDescription}`;
    
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
      
      toast.success("Course Generation Started!", {
        description: `Creating a personalized course on "${topic}"...`,
      });
      
      console.log("Started course generation for:", topic);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to create course. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Toaster position="top-center" richColors />
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary">0to1 Learning</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into engaging courses with AI-powered content generation. 
            Create, organize, and deliver learning experiences that inspire.
          </p>
        </div>

        {/* Main Course Creation Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="shadow-lg border-0 bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                <span>Create Your First Course</span>
              </CardTitle>
              <CardDescription className="text-base">
                Describe your course idea and let AI help you build the perfect learning experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Course Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Machine Learning"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="text-base"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Course Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you want to teach, the target audience, and key learning objectives..."
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  rows={4}
                  className="text-base resize-none"
                />
              </div>
              
              <Button 
                onClick={handleTopicSubmit}
                disabled={!courseTitle.trim() || !courseDescription.trim() || isLoading}
                className="w-full text-base py-6"
                size="lg"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Generate Course with AI
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="text-center border-0 bg-gradient-card">
            <CardContent className="pt-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Generation</h3>
              <p className="text-sm text-muted-foreground">
                Automatically generate course content, lessons, and assessments using advanced AI
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-gradient-card">
            <CardContent className="pt-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Learning</h3>
              <p className="text-sm text-muted-foreground">
                Create engaging lessons with multimedia content and interactive elements
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-gradient-card">
            <CardContent className="pt-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Progress Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor learner progress and provide personalized feedback
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;