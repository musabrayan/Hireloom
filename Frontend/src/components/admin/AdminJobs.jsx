import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/global/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import AdminJobsTable from './AdminJobsTable'
import { setSearchJobsByText } from '@/redux/jobSlice'

const AdminJobs = () =>  {
  useGetAllAdminJobs()
  const navigate = useNavigate()
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobsByText(input)); 
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-1/3 bg-input text-foreground border border-border"
            placeholder="Filter by job title"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            onClick={()=> navigate("/admin/jobs/create")} 
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs;
