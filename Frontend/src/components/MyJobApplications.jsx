import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';


const MyJobApplications = () => {
  const { allUserAppliedJobs } = useSelector(store => store.jobs)
  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-white";
      case "rejected":
        return "bg-red-500 text-white";
      case "pending":
        return "bg-yellow-200 text-black";
      default:
        return "bg-muted text-foreground";
    }
  };
  return (
    <div className="overflow-x-auto mt-4">
      <Table className="min-w-full border rounded-xl bg-background text-foreground">
        <TableCaption className="text-muted-foreground mt-2">
          List of your applied jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUserAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                You have no applied jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allUserAppliedJobs.map((application) => (
              <TableRow key={application._id}>
                <TableCell>
                  {application?.jobId?.jobTitle || "Job no longer available"}
                </TableCell>
                <TableCell>
                  {application?.jobId?.companyId?.companyName ||
                    "Company not available"}
                </TableCell>
                <TableCell>
                  {new Date(application.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusClass(application.applicationStatus)}>
                    {application.applicationStatus.charAt(0).toUpperCase() + application.applicationStatus.slice(1)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
    </div>
  );
};

export default MyJobApplications;
