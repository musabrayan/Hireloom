import React from 'react'
import RecentJobCards from './RecentJobCards'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const RecentJobs = () => {
  const { jobList } = useSelector(store => store.jobs)

  return (
    <motion.section
      className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 my-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center sm:text-left"
        variants={itemVariants}
      >
        <span className="text-primary">Latest & Top</span> Job Openings
      </motion.h2>

      {/* Responsive Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {jobList.length <= 0 ? (
          <motion.span variants={itemVariants}>
            No opportunities at the moment.
          </motion.span>
        ) : (
          jobList.slice(0, 6).map((job) => (
            <motion.div
              key={job._id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <RecentJobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.section>
  )
}

export default RecentJobs
