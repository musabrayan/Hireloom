import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedJob } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {

  const [input, setInput]= useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearchClick = ()=>{
         dispatch(setSearchedJob(input))
         navigate("/browse")
  }

  return (
    <motion.section 
      className="text-center bg-background text-foreground px-4 py-12 sm:py-16 md:py-20 lg:py-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center gap-4 md:gap-6 max-w-4xl mx-auto">
        <motion.span 
          className="px-3 py-1.5 md:px-4 rounded-full bg-muted text-accent font-medium text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          Job Hunting Made Simple ✨
        </motion.span>
        
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Browse Jobs, Apply <br className="hidden sm:block" />
          & <motion.span 
              className="text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              Get Hired 🎉
            </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Tired of endless scrolling? Discover curated job openings tailored to your skills and experience. Apply with ease and track your applications in one place.
        </motion.p>
      </div>
      
      <motion.div 
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-8 md:mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <motion.div 
          className="flex w-full shadow-lg border border-border pl-3 rounded-full items-center gap-4 bg-card"
          whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          whileFocus={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <motion.input
            type="text"
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full bg-transparent text-foreground"
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="rounded-r-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSearchClick}
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                <Search className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;