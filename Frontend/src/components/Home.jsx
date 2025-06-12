import React, { useEffect } from 'react'
import Navbar from './global/Navbar'
import HeroSection from './HeroSection'
import Slider from './Slider'
import RecentJobs from './RecentJobs'
import Footer from './global/Footer'
import useJobList from '@/hooks/useJobList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useJobList();
  const {user} = useSelector(store=>store.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.userRole === 'recruiter'){
      navigate("/admin/companies")
    }
    
  })

  return (
    
    <div className='bg-background text-foreground min-h-screen'>
        <Navbar/>
        <HeroSection/>
        <Slider/>
        <RecentJobs/>
        <Footer/>
    </div>
  )
}

export default Home