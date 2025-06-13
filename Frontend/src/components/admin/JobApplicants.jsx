import React from 'react'
import AllApplicantsTable from './AllApplicantsTable'
import Navbar from '../global/Navbar'

const JobApplicants = () => {
  return (
    <div className='min-h-screen'>
      <Navbar />

      <div className='max-w-6xl mx-auto p-6'>
        <h1 className='text-3xl font-semibold mb-6'>
          All Applicants
        </h1>

        <div className='p-4 rounded-lg shadow-md'>
          <AllApplicantsTable />
        </div>
      </div>
    </div>
  )
}

export default JobApplicants
