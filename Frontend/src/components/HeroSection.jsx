import { Search } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <section className="text-center bg-background text-foreground px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="flex flex-col items-center gap-4 md:gap-6 max-w-4xl mx-auto">
        <span className="px-3 py-1.5 md:px-4 rounded-full bg-muted text-accent font-medium text-xs sm:text-sm md:text-base">
          Job Hunting Made Simple ✨
        </span>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          Browse Jobs, Apply <br className="hidden sm:block" />
          & <span className="text-primary">Get Hired 🎉</span>
        </h1>
        
        <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
          Tired of endless scrolling? Discover curated job openings tailored to your skills and experience. Apply with ease and track your applications in one place.
        </p>
      </div>
      
      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 md:mt-10">
        <div className="flex w-full shadow-lg border border-border pl-3 rounded-full items-center gap-4 bg-card">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full bg-transparent text-foreground"
          />
          <Button className="rounded-r-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;