import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Frontend Developer",
    "Backend Developer", 
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer"
]

const Slider = () => {
    return (
        <div className="w-full py-8 md:py-12 lg:py-16">
            {/* Header Section */}
            <div className="text-center mb-6 md:mb-8 lg:mb-12 px-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                    Browse Categories
                </h2>
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto">
                    Discover your next opportunity across various tech domains
                </p>
            </div>

            {/* Carousel */}
            <Carousel className="w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto px-8 md:px-12 lg:px-16">
                <CarouselContent className="-ml-2 md:-ml-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                            <Button
                                variant="outline"
                                className="w-full h-12 md:h-14 lg:h-16 cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                
                {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
                <CarouselPrevious className="hidden md:flex -left-6 lg:-left-8 w-10 md:h-10 lg:w-12 lg:h-12" />
                <CarouselNext className="hidden md:flex -right-6 lg:-right-8 w-10 md:h-10 lg:w-12 lg:h-12" />
            </Carousel>
        </div>
    )
}

export default Slider