import { setJobList } from '@/redux/jobSlice'
import { JOB_API_BASE_URL } from '@/utils/constant'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useJobList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_BASE_URL}/get`, { withCredentials: true });

                if (res.data.success) {
                    console.log("Jobs fetched:", res.data.jobs);
                    dispatch(setJobList(res.data.jobs)); 
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        getAllJobs(); 
    }, [dispatch]);
};
export default useJobList