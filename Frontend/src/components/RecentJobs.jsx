import React from 'react'
import RecentJobCards from './RecentJobCards'
import { useSelector } from 'react-redux'



const RecentJobs = () => {
  const {jobList} = useSelector(store=>store.jobs)
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-16">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center sm:text-left">
        <span className="text-primary">Latest & Top</span> Job Openings
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobList.length <= 0 ? (
        <span>No opportunities at the moment.</span>
      ) : (
        jobList.slice(0, 6).map((job) => (
          <RecentJobCards key={job._id} job={job} />
  ))
)}

      </div>
    </section>
  )
}

export default RecentJobs
