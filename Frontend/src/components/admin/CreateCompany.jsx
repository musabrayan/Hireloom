import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../global/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { COMPANY_API_BASE_URL } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const CreateCompany = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName,setCompanyName] = useState('')
  
  const registerNewCompany = async ()=>{
        try {
        const res = await axios.post(`${COMPANY_API_BASE_URL}/register`,{companyName},{
                headers:{
                    'Content-type':'application/json'
                },
                withCredentials:true
            })

            if(res?.data?.success){

                toast.success(res.data.message)
                dispatch(setSingleCompany(res.data.company))
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/edit/${companyId}`)

            }
        } catch (error) {
            console.error("Register error:", error.response?.data || error.message);

    toast.error(
        error?.response?.data?.message || "Something went wrong!"
    );
        }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Your Company Name</h1>
          <p className="text-muted-foreground">
            What would you like to name your company? You can always change it later.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              type="text"
              placeholder="Google, Microsoft... etc"
              className="bg-card border-border"
              onChange={(e)=>{setCompanyName(e.target.value)}}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/admin/companies')}
            >
              Cancel
            </Button>
            <Button onClick={registerNewCompany}>Continue</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCompany
