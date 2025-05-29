import Navbar from '../global/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Link } from 'react-router-dom';

const Signup = () => {

    const [input,setInput] = useState({
            fullname:"",
            email:"",
            password:"",
            userRole:"",
            file
        })
    
        const changeEventHaandler = (e)=>{
            setInput({...input,[e.target.name]:[e.target.value]})
        }
    
        const changeFileHandler = (e)=>{
            setInput({...input,file:e.target.files?.[0]})
        }
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Main container with improved responsive padding and centering */}
      <div className="flex justify-center items-start px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
        
        {/* Form container with responsive width and spacing */}
        <form className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg space-y-4 sm:space-y-5 md:space-y-6">
          
          {/* Responsive heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4">
            Create Your Account
          </h1>
          
          {/* Full Name Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base font-medium">
              Full Name
            </Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Enter your full name"
              value={input.fullname}
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>
          
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
          
          {/* Mobile Number Field */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="mobile" className="text-sm sm:text-base font-medium">
              Mobile Number
            </Label>
            <Input 
              id="mobile" 
              type="tel" 
              placeholder="+91 98765 43210" 
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
              placeholder="Choose a secure password" 
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>
          
          {/* User Role Selection with improved responsive layout */}
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
          
          {/* Profile Picture Upload */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="profile" className="text-sm sm:text-base font-medium">
              Upload Profile Picture
            </Label>
            <Input
              id="profile"
              type="file"
              accept="image/*"
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base cursor-pointer file:mr-2 file:py-1 file:px-2 sm:file:py-1.5 sm:file:px-3 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
            />
          </div>
          
          {/* Submit Button with responsive sizing */}
          <Button 
            type="submit" 
            className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium mt-4 sm:mt-6 transition-all duration-200 hover:shadow-lg"
          >
            Sign Up
          </Button>
          
          {/* Optional: Terms and conditions or login link */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;