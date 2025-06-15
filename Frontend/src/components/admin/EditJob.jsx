import React, { useState, useEffect } from "react";
import Navbar from "../global/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useParams, useNavigate } from "react-router-dom";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../ui/select";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_BASE_URL } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { allCompanies } = useSelector((store) => store.company);
  
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

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const handleSelect = (field, val) => {
    if (field === "companyId") {
      const selectedCompany = allCompanies?.find((c) => c.companyName.toLowerCase() === val);
      setInput({ ...input, companyId: selectedCompany?._id });
    } else {
      setInput({ ...input, [field]: val });
    }
  };
  
  // Fetch job details first
  useEffect(() => {
    const fetchJob = async () => {
      setFetching(true);
      try {
        const res = await axios.get(`${JOB_API_BASE_URL}/get/${id}`, { withCredentials: true });
        if (res?.data?.job) {
          const job = res?.data?.job;
          setInput({ 
            jobTitle: job.jobTitle || "", 
            jobDescription: job.jobDescription || "", 
            jobRequirements: (job.jobRequirements?.join(", ")) || "", 
            salary: job.salary || "", 
            jobLocation: job.jobLocation || "", 
            employmentType: job.employmentType || "", 
            minExperience: job.minExperience || "", 
            openPositions: job.openPositions || "", 
            companyId: job.companyId?._id || "" 
          });
        }
      } catch (error) {
        toast.error("Failed to fetch job details.");
      } finally {
        setFetching(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${JOB_API_BASE_URL}/update/${id}`, input,{ 
        headers:{ "Content-Type": "application/json"},
        withCredentials: true
      });

      if (res?.data?.success) {
        toast.success("Job updated successfully.");
        navigate("/admin/jobs");
      }
    } catch (error) {
        console.log(error);
        
      toast.error(error?.response?.data?.message || "Failed to update.");
    } finally {
      setLoading(false);
    }
  };
  
  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Fetching job details...</span>
      </div>
    )
  }
  
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
              className="w-fit flex items-center gap-2"
              onClick={() => navigate("/admin/jobs")} 
            >
              <span>&larr;</span>
              <span>Back</span>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              Edit Job
            </h1>
          </div>

          {/* form fields are the same as in JobPostForm */}
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input id="jobTitle" name="jobTitle" value={input.jobTitle} onChange={changeEventHandler} />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="jobLocation">Location</Label>
            <Input id="jobLocation" name="jobLocation" value={input.jobLocation} onChange={changeEventHandler} />
          </div>

          {/* Employment Type */}
          <div className="space-y-2">
            <Label htmlFor="employmentType">Employment Type</Label>
            <Select onValueChange={(val) => handleSelect("employmentType", val)} 
                    defaultValue={input.employmentType}>
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
            <Input id="salary" name="salary" type="number" value={input.salary} onChange={changeEventHandler} />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label htmlFor="minExperience">Experience (yrs)</Label>
            <Input id="minExperience" name="minExperience" type="number" value={input.minExperience} onChange={changeEventHandler} />
          </div>

          {/* Positions */}
          <div className="space-y-2">
            <Label htmlFor="openPositions">Open Positions</Label>
            <Input id="openPositions" name="openPositions" type="number" value={input.openPositions} onChange={changeEventHandler} />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea id="jobDescription" name="jobDescription" value={input.jobDescription} onChange={changeEventHandler} />
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="jobRequirements">Requirements</Label>
            <Textarea id="jobRequirements" name="jobRequirements" value={input.jobRequirements} onChange={changeEventHandler} />
          </div>

          <div className="space-y-2">
            {allCompanies?.length > 0 && (
              <Select onValueChange={(val) => handleSelect("companyId", val)} 
                      defaultValue={allCompanies?.find((c) => c._id === input.companyId)?.companyName?.toLowerCase()}>
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

         
          <div className="pt-4">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Button
                type="submit"
                className="w-40 sm:w-52 px-6 py-2"
              >
                Update Job
              </Button>
            )}

          </div>
        </form>
      </div>
    </div>
  )
};

export default EditJob;
