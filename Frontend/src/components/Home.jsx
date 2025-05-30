import React from 'react'
import Navbar from './global/Navbar'
import HeroSection from './HeroSection'
import CategoryComponent from './Slider'

const Home = () => {
  return (
    <div className='bg-background text-foreground min-h-screen'>
        <Navbar/>
        <HeroSection/>
        <CategoryComponent/>
    </div>
  )
}

export default Home