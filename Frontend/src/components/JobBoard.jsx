import React from 'react'
import Navbar from './global/Navbar'
import FilterCards from './FilterCards'
import JobCard from './JobCard'

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const JobBoard = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="mt-3 sm:mt-5 px-2 sm:px-4">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-5">
         
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-card text-card-foreground p-3 sm:p-4 rounded-lg sm:rounded-2xl shadow">
              <FilterCards />
            </div>
          </div>
          
        
          {jobArray.length <= 0 ? (
            <div className="flex-1 text-center text-muted-foreground text-base sm:text-lg py-8">
              Job not found
            </div>
          ) : (
            <div className="flex-1 h-[70vh] sm:h-[80vh] overflow-y-auto pb-3 sm:pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
                {jobArray.map((item, index) => (
                  <div key={index}>
                    <JobCard />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobBoard