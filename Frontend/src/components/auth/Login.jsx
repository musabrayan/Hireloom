import React, { useState } from 'react';
import Navbar from '../global/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const Login = () => {


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Main container with improved responsive padding and centering */}
      <div className="flex justify-center items-start px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
        
        {/* Form container with responsive width and spacing */}
        <form className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg space-y-4 sm:space-y-5 md:space-y-6">
          
          {/* Responsive heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4">
            Welcome Back
          </h1>
          
          {/* Email Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base font-medium">
              Email Address
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>
          
          {/* Password Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="password" className="text-sm sm:text-base font-medium">
              Password
            </Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>
          
          {/* User Role Selection */}
          <div className="space-y-2 sm:space-y-3">
            <Label className="text-sm sm:text-base font-medium">
              User Role
            </Label>
            <RadioGroup 
              defaultValue="student" 
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <RadioGroupItem 
                  value="student" 
                  id="student" 
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <Label 
                  htmlFor="student" 
                  className="text-sm sm:text-base cursor-pointer"
                >
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <RadioGroupItem 
                  value="recruiter" 
                  id="recruiter" 
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
                <Label 
                  htmlFor="recruiter" 
                  className="text-sm sm:text-base cursor-pointer"
                >
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Submit Button with responsive sizing */}
          <Button 
            type="submit" 
            className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium mt-4 sm:mt-6 transition-all duration-200 hover:shadow-lg"
          >
            Sign In
          </Button>
          
          {/* Optional: Signup link */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Don't have an account?{' '}
              <a href="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;