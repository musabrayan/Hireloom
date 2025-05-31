import React from 'react'
import Navbar from './global/Navbar'
import HeroSection from './HeroSection'
import Slider from './Slider'
import RecentJobs from './RecentJobs'
import Footer from './global/Footer'

const Home = () => {
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