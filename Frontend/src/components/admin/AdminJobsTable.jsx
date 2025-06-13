import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-IN', options)
}

const AdminJobsTable = () => {
  const { adminJobList, searchJobsByText } = useSelector((store) => store.jobs)
  const [filterJobs, setFilterJobs] = useState(adminJobList)
  const navigate = useNavigate()

  useEffect(() => {
    if (!adminJobList) return

    const filtered = adminJobList.filter((job) =>
      searchJobsByText
        ? job?.jobTitle?.toLowerCase().includes(searchJobsByText.toLowerCase()) ||
        job?.companyId?.companyName?.toLowerCase().includes(searchJobsByText.toLowerCase())
        : true
    )

    setFilterJobs(filtered)
  }, [adminJobList, searchJobsByText])

  return (
    <div className="w-full bg-card text-foreground rounded-xl shadow-md">
      <Table>
        <TableCaption className="text-muted-foreground mt-4">
          A list of your recently posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No jobs posted.
              </TableCell>
            </TableRow>
          ) : (
            filterJobs?.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">
                  {job?.companyId?.companyName}
                </TableCell>
                <TableCell>{job?.jobTitle}</TableCell>
                <TableCell>{formatDate(job?.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="inline-flex items-center justify-center rounded-md p-1 hover:bg-muted">
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 bg-popover  border border-border shadow-md p-2 rounded-md">
                      <button
                        className="flex items-center gap-2 text-sm hover:text-primary transition cursor-pointer mb-2"
                        onClick={() => navigate(`/admin/jobs/${job?._id}`)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>

                      <button
                        className="flex items-center gap-2 text-sm hover:text-primary transition whitespace-nowrap cursor-pointer"
                        onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)}
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Applicants</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable
