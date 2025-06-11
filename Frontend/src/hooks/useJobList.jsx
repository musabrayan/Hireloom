import axios from 'axios'
import React, { useEffect } from 'react'

const useJobList = () => {
  
    useEffect(()=>{
        const getAllJobs = async ()=>{
                try {
                    const res = await axios.get()
                } catch (error) {
                    console.log(error);
                    
                }
        }
    },[])
}

export default useJobList