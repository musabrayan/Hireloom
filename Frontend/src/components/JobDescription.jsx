import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const JobDescription = () => {
  const isApplied = false;

  return (
    <div className="max-w-7xl mx-auto mb-10 p-15 sm:px-6 lg:px-8">
    
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Title</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-semibold text-accent">12 Positions</Badge>
            <Badge variant="outline" className="font-semibold text-destructive">Part-Time</Badge>
            <Badge variant="outline" className="font-semibold text-emerald-600 dark:text-emerald-400">12 LPA</Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          className={`transition-colors ${
            isApplied ? 'bg-accent text-accent-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      
      <div className="bg-card text-card-foreground rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Job Description</h2>
        <p className="text-base"><span className="font-medium text-accent">Job Role:</span> Frontend Developer</p>
        <p className="text-base"><span className="font-medium text-accent">Location:</span> Chennai, India</p>
        <p className="text-base"><span className="font-medium text-accent">Description:</span> Build modern frontend UI using React & Tailwind</p>
        <p className="text-base"><span className="font-medium text-accent">Salary:</span> 12 LPA</p>
        <p className="text-base"><span className="font-medium text-accent">Total Applicants:</span> 150</p>
        <p className="text-base"><span className="font-medium text-accent">Posted Date:</span> 10 June 2025</p>
      </div>
    </div>
  );
};

export default JobDescription;
