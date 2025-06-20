import { setJobList } from '@/redux/jobSlice'
import { JOB_API_BASE_URL } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useJobList = () => {
    const dispatch = useDispatch();
    const { searchedJob } = useSelector(store => store.jobs)
    useEffect(() => {
        const getAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_BASE_URL}/get?keyword=${searchedJob}`);
                console.log(res.data);
                
                
                if (res?.data?.success) {
                    dispatch(setJobList(res.data.jobs));
                } else {
                    dispatch(setJobList([]));
                }
            } catch (error) {
                if (error.response?.status === 404) {
                    dispatch(setJobList([])); 
                } else {
                    console.error("Failed to fetch jobs:", error.message);
                }
            }
        };

        getAllJobs();
    }, [searchedJob]);
};
export default useJobList