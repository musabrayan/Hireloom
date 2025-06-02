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

// Sample job applications data
const jobApplications = [
  {
    id: 1,
    appliedDate: '2025-03-18',
    jobRole: 'Frontend Developer',
    company: 'Google',
    status: 'Selected',
    statusVariant: 'success',
  },
  {
    id: 2,
    appliedDate: '2025-03-22',
    jobRole: 'Backend Developer',
    company: 'Amazon',
    status: 'In Review',
    statusVariant: 'secondary',
  },
  {
    id: 3,
    appliedDate: '2025-04-01',
    jobRole: 'UI/UX Designer',
    company: 'Adobe',
    status: 'Rejected',
    statusVariant: 'destructive',
  },
  {
    id: 4,
    appliedDate: '2025-04-15',
    jobRole: 'Full Stack Engineer',
    company: 'Microsoft',
    status: 'Interview Scheduled',
    statusVariant: 'outline',
  },
];

const MyJobApplications = () => {
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
          {jobApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.appliedDate}</TableCell>
              <TableCell>{application.jobRole}</TableCell>
              <TableCell>{application.company}</TableCell>
              <TableCell className="text-right">
                <Badge variant={application.statusVariant}>
                  {application.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyJobApplications;
