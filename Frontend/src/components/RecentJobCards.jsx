import React from 'react'
import { Badge } from './ui/badge'

const RecentJobCards = () => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto cursor-pointer">

    
      <div className="mb-4">
        <h2 className="text-primary text-lg font-semibold">Company Name</h2>
        <p className="text-sm text-muted-foreground">India</p>
      </div>

   
      <div className="mb-4">
        <h3 className="text-secondary-foreground text-base font-medium">Frontend Developer</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Join our team to work on exciting frontend projects with React and Tailwind.
        </p>
      </div>

     
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-accent font-semibold">12 Positions</Badge>
        <Badge variant="outline" className="text-destructive font-semibold">Part-Time</Badge>
        <Badge variant="outline" className="text-green-600 dark:text-green-400 font-semibold">12 LPA</Badge>
      </div>
    </div>
  )
}

export default RecentJobCards
