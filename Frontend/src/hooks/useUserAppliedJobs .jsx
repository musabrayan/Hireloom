import { setAllUserAppliedJobs } from "@/redux/jobSlice"
import { APPLICATION_API_BASE_URL } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useUserAppliedJobs  = () => {
   const dispatch = useDispatch()

   useEffect(()=>{

    const fetchUserAppliedJobs = async ()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_BASE_URL}/get`, {withCredentials:true})

            if(res.data.success){
                dispatch(setAllUserAppliedJobs(res.data.applications))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchUserAppliedJobs()
   },[])
}

export default useUserAppliedJobs 