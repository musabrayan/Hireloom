import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import Navbar from '../global/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

import { USER_API_BASE_URL } from '../../utils/constant';
import { setLoading, setUser } from '@/redux/authSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userRole: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading,user } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, userRole: role });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${USER_API_BASE_URL}/login`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user))
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/")
    }

  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="flex justify-center items-start px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 lg:px-8 lg:py-16">
        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl bg-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md md:shadow-lg space-y-5"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Welcome Back</h1>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="h-11 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="h-11 text-base"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">User Role</Label>
            <RadioGroup
              value={formData.userRole}
              onValueChange={handleRoleChange}
              className="flex flex-col xs:flex-row gap-4"
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="student" value="student" className="w-5 h-5" />
                <Label htmlFor="student" className="text-base cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem id="recruiter" value="recruiter" className="w-5 h-5" />
                <Label htmlFor="recruiter" className="text-base cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium mt-6 transition-all duration-200 hover:shadow-lg"
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
          </Button>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
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
