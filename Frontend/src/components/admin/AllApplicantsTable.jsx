import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent } from '../ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal } from 'lucide-react'

const AllApplicantsTable = () => {
    const demo = ["selected", "rejected"];

    return (
        <div className="w-full bg-card text-foreground rounded-xl shadow-md overflow-x-auto p-4">
            {/* The p-4 adds some padding; overflow-x-auto lets it scroll horizontally on small screens */}
            <Table className="min-w-max">
                {/* min-w-max prevents the table from shrinking to fit small screens */}
                
                <TableCaption className="text-muted-foreground mt-4">
                    Recent Applicants
                </TableCaption>

                <TableHeader className="bg-card">
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact no</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell className="font-semibold whitespace-nowrap">
                            Full Name
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                            Email
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                            Contact
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                            Resume
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                            Date
                        </TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger className="inline-flex items-center justify-center rounded-md p-1 hover:bg-muted">
                                   <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                                </PopoverTrigger>
                                <PopoverContent className="w-32 bg-popover border border-border shadow-md p-2 rounded-md space-y-1">
                                   {demo.map((status, index) => (
                                      <div
                                         key={index}
                                         className="px-2 py-1 rounded-md transition capitalize cursor-pointer hover:text-primary"
                                      >
                                         {status}
                                      </div>
                                   ))}
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default AllApplicantsTable;
