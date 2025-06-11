import React from 'react'
import { Badge } from './ui/badge'
import JobDescription from './JobDescription'

const RecentJobCards = ({job}) => {
  return (
    <div className="bg-card border border-border rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out p-4 sm:p-6 md:p-8 w-full max-w-md mx-auto cursor-pointer">

    
      <div className="mb-4">
        <h2 className="text-primary text-lg font-semibold">{job?.companyId?.companyName}</h2>
        <p className="text-sm text-muted-foreground">{job?.jobLocation}</p>
      </div>

   
      <div className="mb-4">
        <h3 className="text-secondary-foreground text-base font-medium">{job?.jobTitle}</h3>
        <p className="text-sm text-muted-foreground mt-1">
           {job?.jobDescription}
        </p>
      </div>

     
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="text-accent font-semibold">{job?.
openPositions} Positions</Badge>
        <Badge variant="outline" className="text-destructive font-semibold">{job?.
employmentType}</Badge>
        <Badge variant="outline" className="text-green-600 dark:text-green-400 font-semibold">{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default RecentJobCards
