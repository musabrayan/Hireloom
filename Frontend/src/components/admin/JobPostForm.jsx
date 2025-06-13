import React, { useState } from "react";
import Navbar from "../global/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { useSelector } from "react-redux";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../ui/select";
import axios from "axios";
import { JOB_API_BASE_URL } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const JobPostForm = () => {

  const { allCompanies } = useSelector(store => store.company);
  
  const [input, setInput] = useState({ 
    jobTitle: "", 
    jobDescription: "", 
    jobRequirements: "", 
    salary: "", 
    jobLocation: "", 
    employmentType: "", 
    minExperience: "", 
    openPositions: "", 
    companyId: "" 
  });

  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Generic handleSelect for both company and employmentType
  const handleSelect = (field, val) => {
    if (field === "companyId") {
      const selectedCompany = allCompanies?.find((c) => c.companyName.toLowerCase() === val);
      setInput({ ...input, companyId: selectedCompany?._id });
    } else {
      setInput({ ...input, [field]: val });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         setLoading(true);
         const res = await axios.post(`${JOB_API_BASE_URL}/post`,input,{
          headers:{
            'Content-Type':'application/json'
          },withCredentials:true
         })

         if(res.data.success){
     toast.success(res.data.message)
     navigate('/admin/jobs')
         }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit flex items-center cursor-pointer gap-2 border-border hover:bg-accent hover:text-foreground"
              onClick={() => navigate("/admin/jobs")} 
            >
              <span>&larr;</span>
              <span>Back</span>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">
              Post New Job
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={input.jobTitle}
                onChange={changeEventHandler}
                placeholder="e.g. Senior Software Engineer"
                className="bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="jobLocation">Location</Label>
              <Input
                id="jobLocation"
                name="jobLocation"
                type="text"
                value={input.jobLocation}
                onChange={changeEventHandler}
                placeholder="e.g. New York, NY"
                className="bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Employment Type */}
            <div className="space-y-2">
              <Label htmlFor="employmentType">Employment Type</Label>
              <Select onValueChange={(val) => handleSelect("employmentType", val)}>
                <SelectTrigger className="w-full">
                   <SelectValue placeholder="Select employment Type" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectGroup>
                     <SelectItem value="full-time">Full Time</SelectItem>
                     <SelectItem value="part-time">Part Time</SelectItem>
                     <SelectItem value="contract">Contract</SelectItem>
                     <SelectItem value="freelance">Freelance</SelectItem>
                   </SelectGroup>
                 </SelectContent>
               </Select>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="in LPA"
                className="bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="minExperience">Experience (years)</Label>
              <Input
                id="minExperience"
                name="minExperience"
                type="number"
                value={input.minExperience}
                onChange={changeEventHandler}
                placeholder="2"
                className="bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Positions */}
            <div className="space-y-2">
              <Label htmlFor="openPositions">Open Positions</Label>
              <Input
                id="openPositions"
                name="openPositions"
                type="number"
                value={input.openPositions}
                onChange={changeEventHandler}
                placeholder="1"
                className="bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

            {/* Description */}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="jobDescription">Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                value={input.jobDescription}
                onChange={changeEventHandler}
                placeholder="Brief job description..."
                className="bg-card border-border focus:ring-ring focus:border-ring resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2 col-span-full">
              <Label htmlFor="jobRequirements">Requirements</Label>
              <Textarea
                id="jobRequirements"
                name="jobRequirements"
                value={input.jobRequirements}
                onChange={changeEventHandler}
                placeholder="Key qualifications, tech stack, etc."
                className="bg-card border-border focus:ring-ring focus:border-ring resize-none"
              />
            </div>

            {/* Company Select */}
            <div className="space-y-2">
              {allCompanies?.length > 0 && (
                <Select onValueChange={(val) => handleSelect("companyId", val)}>
                   <SelectTrigger className="w-full">
                     <SelectValue placeholder="Select a company" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectGroup>
                       {allCompanies?.map((company) => (
                         <SelectItem key={company._id} value={company?.companyName.toLowerCase()}>
                           {company.companyName}
                         </SelectItem>
                       ))}
                     </SelectGroup>
                   </SelectContent>
                 </Select>
               )}

            </div>
          </div>

         

          <div className="pt-4 flex flex-col sm:flex-row sm:justify-start items-center gap-3 w-full">
             {loading ? (
              <div className="flex items-center justify-center w-full sm:w-auto">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              <Button
              type="submit"
              className="w-40 sm:w-52 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
            >
              Post Job
            </Button>
            )}
          </div>

          {allCompanies?.length === 0 && (
            <p className="text-accent text-xs font-bold text-center my-3">
              Register a company first !!
            </p>
          )}

        </form>
      </div>
    </div>
  )
}

export default JobPostForm;
