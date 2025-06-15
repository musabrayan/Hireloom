import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { motion } from 'framer-motion'

dayjs.extend(relativeTime)

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  const postedAgo = job?.createdAt
    ? dayjs(job.createdAt).fromNow()
    : 'Some time ago'

  return (
    <motion.div
      className="bg-card text-card-foreground p-5 rounded-2xl shadow border border-border"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
    >
    
      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>{postedAgo}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button variant="outline" className="rounded-full" size="icon">
            <Bookmark className="w-4 h-4" />
          </Button>
        </motion.button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.companyId?.logoUrl} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-sm">{job?.companyId?.companyName}</h2>
          <p className="text-xs text-muted-foreground">{job?.jobLocation}</p>
        </div>
      </div>

    
      <div className="mb-4">
        <h3 className="font-bold text-lg text-primary">{job?.jobTitle}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job?.jobDescription}
        </p>
      </div>

      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge variant="outline" className="font-semibold text-accent">
          {job?.openPositions} Positions
        </Badge>
        <Badge variant="outline" className="font-semibold text-destructive">
          {job?.employmentType}
        </Badge>
        <Badge variant="outline" className="font-semibold text-emerald-600 dark:text-emerald-400">
          {job?.salary} LPA
        </Badge>
      </div>

    
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Button
            className="cursor-pointer"
            onClick={() => navigate(`/job-description/${job?._id}`)}
            variant="secondary"
          >
            Details
          </Button>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Save for Later
          </Button>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default JobCard
