import React, { useEffect } from 'react'
import Navbar from './global/Navbar'
import JobCard from './JobCard'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedJob } from '@/redux/jobSlice'
import useJobList from '@/hooks/useJobList'



const BrowseJobs = () => {
  useJobList()
  const { jobList } = useSelector(store => store.jobs)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(setSearchedJob(""))
    }
  })
  return (
    <div className='h-screen bg-background overflow-auto'>
      <Navbar />

      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <h1 className="text-2xl font-semibold mb-6">
          Search Results ({jobList.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobList.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No results found for your search.
            </p>
          ) : (
            jobList.map((job) => (
              <JobCard key={job._id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseJobs
