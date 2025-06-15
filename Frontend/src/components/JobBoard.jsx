import React, { useEffect, useState } from 'react'
import Navbar from './global/Navbar'
import FilterCards from './FilterCards'
import JobCard from './JobCard'
import Footer from './global/Footer'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const JobBoard = () => {
  const { jobList } = useSelector(store => store.jobs)

  const [filterJobs, setFilterJobs] = useState(jobList)
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    minSalary: 0
  })

  useEffect(() => {
    let filtered = [...jobList]

    if (filters.title) {
      filtered = filtered.filter(job =>
        job.jobTitle?.toLowerCase().includes(filters.title.toLowerCase())
      )
    }

    if (filters.location) {
      filtered = filtered.filter(job =>
        job.jobLocation?.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.salaryRange?.length === 2) {
      const [min, max] = filters.salaryRange
      filtered = filtered.filter(job =>
        job.salary >= min && job.salary <= max
      )
    }

    setFilterJobs(filtered)
  }, [jobList, filters])

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />

      <div className="mt-3 sm:mt-5 px-2 sm:px-4 flex-1 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-5 flex-1">
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-card text-card-foreground p-3 sm:p-4 rounded-lg sm:rounded-2xl shadow">
              <FilterCards filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {filterJobs.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground text-base sm:text-lg">
              Job not found
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto pb-3 sm:pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <JobCard job={job} />
                    </motion.div>
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
