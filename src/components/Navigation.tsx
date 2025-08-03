'use client';

import { Button } from '@/components/ui/button';
import { Home, BookOpen, PlusCircle, Library } from 'lucide-react';

type ViewType = 'home' | 'dashboard' | 'create' | 'course' | 'lesson';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Navigation = ({ currentView, onNavigate }: NavigationProps) => {
  const navItems: { id: ViewType; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: Library },
    { id: 'create', label: 'Create Course', icon: PlusCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">0to1 Learning</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;