import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  const postedAgo = job?.createdAt
    ? dayjs(job.createdAt).fromNow()
    : 'Some time ago'

  return (
    <div className="bg-card text-card-foreground p-5 rounded-2xl shadow border border-border transition hover:shadow-lg">
      
      {/* Top Bar with Posted Time and Bookmark */}
      <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
        <span>{postedAgo}</span>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={job?.companyId?.logoUrl}/>
        </Avatar>
        <div>
          <h2 className="font-semibold text-sm">{job?.companyId?.companyName}</h2>
          <p className="text-xs text-muted-foreground">{job?.jobLocation}</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-primary">{job?.jobTitle}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job?.jobDescription}
        </p>
      </div>

      {/* Badges: Positions, Type, Salary */}
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

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Button
          className="cursor-pointer"
          onClick={() => navigate(`/job-description/${job?._id}`)}
          variant="secondary"
        >
          Details
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save for Later
        </Button>
      </div>
    </div>
  )
}

export default JobCard
