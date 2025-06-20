import React from 'react'
import { motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { Button } from './ui/button'
import { setSearchedJob } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const category = [
  "Software Developer",
  "Fullstack Developer",
  "AI Engineer",
  "Cloud Architect",
  "Graphic Designer",
  "Cloud Engineer",
  "DevOps Engineer"
]

const Slider = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSearchClick = (input) => {
    dispatch(setSearchedJob(input))
    navigate("/browse")
  }

  return (
    <motion.div
      className="w-full py-8 md:py-12 lg:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      transition={{ staggerChildren: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
    >

      <motion.div
        className="text-center mb-6 md:mb-8 lg:mb-12 px-4"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.6 }}
        >
          Browse Categories
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Discover your next opportunity across various tech domains
        </motion.p>
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 }
        }}
        transition={{ duration: 0.6 }}
      >
        <Carousel className="w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto px-8 md:px-12 lg:px-16">
          <CarouselContent className="-ml-2 md:-ml-4">
            {category.map((cat, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-12 md:h-14 lg:h-16 cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
                    onClick={() => handleSearchClick(cat)}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {cat}
                    </motion.span>
                  </Button>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
  transition={{ duration: 0.5, delay: 0.6 }}
>
  <CarouselPrevious
    as={motion.button}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="hidden md:flex -left-6 lg:-left-8 w-10 md:h-10 lg:w-12 lg:h-12"
  />
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}
  transition={{ duration: 0.5, delay: 0.6 }}
>
  <CarouselNext
    as={motion.button}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="hidden md:flex -right-6 lg:-right-8 w-10 md:h-10 lg:w-12 lg:h-12"
  />
</motion.div>
        </Carousel>
      </motion.div>
    </motion.div>
  )
}

export default Slider
