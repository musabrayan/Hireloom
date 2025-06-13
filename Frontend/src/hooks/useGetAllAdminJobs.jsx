import { setAdminJobList } from '@/redux/jobSlice'
import { JOB_API_BASE_URL } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_BASE_URL}/getadminjobs`, { withCredentials: true });

                if (res.data.success) {
                    console.log("Admin Jobs fetched:", res.data.jobs);
                    dispatch(setAdminJobList(res.data.jobs)); 
                }
            } catch (error) {
                console.error("Failed to fetch admin jobs:", error);
            }
        };
        getAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
