import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useFetchCompanies from '@/hooks/useFetchCompanies '
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'


const Companies = () => {
  useFetchCompanies();
  const navigate = useNavigate()
  const [input,setInput] = useState("")
  const dispatch = useDispatch()

  useEffect(()=>{
       dispatch(setSearchCompanyByText(input))
  },[input])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-1/3 bg-input text-foreground border border-border"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
          onClick={()=> navigate("/admin/companies/create")}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 transition"
          
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies
