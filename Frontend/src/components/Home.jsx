import React from 'react'
import Navbar from './global/Navbar'
import HeroSection from './HeroSection'
import Slider from './Slider'
import RecentJobs from './RecentJobs'
import Footer from './global/Footer'
import useJobList from '@/hooks/useJobList'

const Home = () => {
  useJobList()
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