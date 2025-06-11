import React from 'react'
import Navbar from './global/Navbar'
import FilterCards from './FilterCards'
import JobCard from './JobCard'
import Footer from './global/Footer'
import { useSelector } from 'react-redux'

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const JobBoard = () => {

  const {jobList} = useSelector(store => store.jobs)
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />
      
      <div className="mt-3 sm:mt-5 px-2 sm:px-4 flex-1 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 flex-1">
          
          {/* Filter Cards Section */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-card text-card-foreground p-3 sm:p-4 rounded-lg sm:rounded-2xl shadow">
              <FilterCards />
            </div>
          </div>
          
          {/* Job Cards Section */}
          {jobList.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground text-base sm:text-lg">
              Job not found
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto pb-3 sm:pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
                  {jobList.map((job) => (
                    <div key={job?._id}>
                      <JobCard job={job} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default JobBoard