import React, { useEffect } from 'react'
import AllApplicantsTable from './AllApplicantsTable'
import Navbar from '../global/Navbar'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_BASE_URL } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const JobApplicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const {applicants} = useSelector(store=>store.application)
  
  
  useEffect(()=>{
    const getAllApplicants = async ()=>{
             try {
              const res = await axios.get(`${APPLICATION_API_BASE_URL}/${params.id}/applicants`,{withCredentials:true})
             dispatch(setAllApplicants(res.data.job))
             } catch (error) {
                console.log(error);
                
             }  
    }
      getAllApplicants()
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar />

      <div className='max-w-6xl mx-auto p-6'>
        <h1 className='text-3xl font-semibold mb-6'>
          All Applicants ({applicants.applications.length})
        </h1>

        <div className='p-4 rounded-lg shadow-md'>
          <AllApplicantsTable />
        </div>
      </div>
    </div>
  )
}

export default JobApplicants
