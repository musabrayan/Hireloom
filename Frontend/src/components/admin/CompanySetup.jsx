import React, { useEffect, useState } from 'react'
import Navbar from '../global/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { COMPANY_API_BASE_URL } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useCompanyById from '@/hooks/useCompanyById'

const CompanySetup = () => {
  const params = useParams()
  useCompanyById(params.id)
  const [input, setInput] = useState({
    companyName: "",
    companyDescription: "",
    websiteUrl: "",
    headquarters: "",
    logoFile: null
  })

  const [loading, setLoading] = useState(false)
  const { singleCompany } = useSelector(store => store.company)
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, logoFile: file })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("companyName", input.companyName);
    formData.append("headquarters", input.headquarters);
    formData.append("companyDescription", input.companyDescription);
    formData.append("websiteUrl", input.websiteUrl);

    if (input.logoFile) {
      formData.append("file", input.logoFile)
    }
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_BASE_URL}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies")
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    setInput({
      companyName: singleCompany.companyName || "",
      companyDescription: singleCompany.companyDescription || "",
      websiteUrl: singleCompany.websiteUrl || "",
      headquarters: singleCompany.headquarters || "",
      logoFile: singleCompany.logoFile || null
    })
  }, [singleCompany])


  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-4xl">
        <form onSubmit={submitHandler} className="space-y-6 sm:space-y-8">
        
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit flex items-center cursor-pointer gap-2 border-border hover:bg-accent hover:text-foreground"
              onClick={() => navigate("/admin/companies")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-foreground">
              Company Setup
            </h1>
          </div>

        
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
         
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Company Name
              </Label>
              <Input
                type="text"
                name="companyName"
                value={input.companyName}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="w-full bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

           
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Headquarters
              </Label>
              <Input
                type="text"
                name="headquarters"
                value={input.headquarters}
                onChange={changeEventHandler}
                placeholder="Enter headquarters location"
                className="w-full bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

          
            <div className="lg:col-span-2 space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Company Description
              </Label>
              <Textarea
                name="companyDescription"
                value={input.companyDescription}
                onChange={changeEventHandler}
                rows={4}
                placeholder="Tell us about your company..."
                className="w-full bg-card border-border focus:ring-ring focus:border-ring resize-none"
              />
            </div>

            
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Website URL
              </Label>
              <Input
                type="url"
                name="websiteUrl"
                value={input.websiteUrl}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="w-full bg-card border-border focus:ring-ring focus:border-ring"
              />
            </div>

         
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Company Logo
              </Label>
              <Input
                type="file"
                name="logoUrl"
                onChange={changeFileHandler}
                accept="image/*"
                className="w-full bg-card border-border focus:ring-ring focus:border-ring file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
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
                className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                Update Company
              </Button>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}

export default CompanySetup