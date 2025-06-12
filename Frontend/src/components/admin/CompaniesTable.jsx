import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-IN', options)
}

const CompaniesTable = () => {
  
 const { allCompanies, searchCompanyByText } = useSelector(store => store.company)
const [filterCompany, setFilterCompany] = useState(allCompanies)
const navigate = useNavigate()

useEffect(() => {
  if (!allCompanies) return

  const filtered = allCompanies.filter((company) =>
    searchCompanyByText
      ? company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      : true
  )

  setFilterCompany(filtered)
}, [allCompanies, searchCompanyByText])

  return (
    <div className="w-full bg-card text-foreground rounded-xl shadow-md">
      <Table>
        <TableCaption className="text-muted-foreground mt-4">
          A list of your recently registered companies
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany?.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No companies registered.
              </TableCell>
            </TableRow>
          ) : (
            filterCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={company.logoUrl || 'https://via.placeholder.com/100'}
                      alt={company.companyName}
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{company.companyName}</TableCell>
                <TableCell>{formatDate(company.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="inline-flex items-center justify-center rounded-md p-1 hover:bg-muted">
                      <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-popover border border-border shadow-md p-2 rounded-md">
                      <button className="flex items-center gap-2 text-sm hover:text-primary transition"
                      onClick={()=> navigate(`/admin/companies/${company?._id}`)}
                      >
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
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

export default CompaniesTable
