import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_BASE_URL } from '@/utils/constant'
import { toast } from 'sonner'

const ACTION_STATUSES = ['selected', 'rejected']

const AllApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application)

    const handleStatusChange = async (newStatus, applicationId) => {
        console.log(newStatus);
        
        try {
            const res = await axios.post(
                `${APPLICATION_API_BASE_URL}/status/${applicationId}/update`,
                { applicationStatus: newStatus },
                { withCredentials: true }
            )
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to update status')
        }
    }

    return (
        <div className="w-full bg-card text-foreground rounded-xl shadow-md overflow-x-auto p-4">
          
            <Table className="min-w-max">
                <TableCaption className="text-muted-foreground mt-4">
                    Recent Applicants
                </TableCaption>

                <TableHeader className="bg-card">
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {applicants?.applications?.length > 0 ? (
                        applicants?.applications?.map((application) => (
                            <TableRow key={application._id}>
                                <TableCell className="font-semibold whitespace-nowrap">
                                   {application?.applicantId?.fullName}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                   {application?.applicantId?.email}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                   {application?.applicantId?.mobileNumber}
                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                   {application?.applicantId?.profileDetails?.resumeUrl ? (
                                      <a
                                         href={application?.applicantId?.profileDetails?.resumeUrl}
                                         target="_blank"
                                         rel="noreferrer"
                                         className="text-blue-500 underline">
                                         View Resume
                                      </a>
                                   ) : (
                                      <span>Not Available</span>
                                   )}

                                </TableCell>
                                <TableCell className="whitespace-nowrap">
                                   {new Date(application?.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                   <Popover>
                                      <PopoverTrigger className="inline-flex items-center justify-center rounded-md p-1 hover:bg-muted">
                                         <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                                      </PopoverTrigger>
                                      <PopoverContent className="w-32 bg-popover border border-border shadow-md p-2 rounded-md space-y-1">
                                         {ACTION_STATUSES.map((status) => (
                                             <div
                                                 key={status}
                                                 className="px-2 py-1 rounded-md transition capitalize cursor-pointer hover:text-primary"
                                                 onClick={() => handleStatusChange(status, application._id)}
                                             >
                                                 {status}
                                             </div>
                                         ))}
                                      </PopoverContent>
                                   </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="6" className="text-center p-4">
                                No applicants found
                            </TableCell>
                        </TableRow>
                    )}

                </TableBody>
            </Table>
        </div>
    )
}

export default AllApplicantsTable
