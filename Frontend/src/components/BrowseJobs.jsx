import React from 'react'
import Navbar from './global/Navbar'
import JobCard from './JobCard'

const jobs = [1, 2, 3]

const BrowseJobs = () => {
  return (
    <div className='h-screen bg-background overflow-auto'>
      <Navbar />
      
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-2xl font-semibold mb-6">
          Search Results ({jobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.map((item, index) => (
            <JobCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrowseJobs
