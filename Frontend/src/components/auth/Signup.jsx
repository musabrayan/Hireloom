import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import Navbar from '../global/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { USER_API_END_POINT } from '../../utils/constant';
import { setLoading } from '@/redux/authSlice';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    userRole: '',
    file: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files?.[0] });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('mobileNumber', formData.mobileNumber);
    data.append('password', formData.password);
    data.append('userRole', formData.userRole);

    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      const response = await axios.post(`${USER_API_END_POINT}/register`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex justify-center items-start px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg space-y-4 sm:space-y-5 md:space-y-6"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 sm:mb-4">
            Create Your Account
          </h1>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              name="mobileNumber"
              placeholder="+91 98765 43210"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Choose a secure password"
              value={formData.password}
              onChange={handleInputChange}
              className="h-10 sm:h-11 md:h-12 text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <Label>User Role</Label>
            <RadioGroup
              value={formData.userRole}
              onValueChange={(value) => setFormData({ ...formData, userRole: value })}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-6"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="cursor-pointer">Student</Label>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <RadioGroupItem value="recruiter" id="recruiter" />
                <Label htmlFor="recruiter" className="cursor-pointer">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="profile">Upload Profile Picture</Label>
            <div className="flex items-center h-10 sm:h-11 md:h-12">
              <Input
                id="profile"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full text-sm sm:text-base cursor-pointer
                  file:mr-2 file:py-1 file:px-2 sm:file:py-1.5 sm:file:px-3
                  file:rounded-md file:border-0 file:text-xs sm:file:text-sm
                  file:font-medium file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/80"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium mt-4 sm:mt-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-10 sm:h-11 md:h-12 text-sm sm:text-base font-medium mt-4 sm:mt-6"
            >
              Sign Up
            </Button>
          )}

          <div className="text-center mt-4 sm:mt-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
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
