
import { setAllCompanies } from '@/redux/companySlice';
import { COMPANY_API_BASE_URL } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFetchCompanies   = () => {
  const dispatch = useDispatch();

    useEffect(() => {
        const FetchAllComapanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_BASE_URL}/get`, { withCredentials: true });

                if (res.data.success) {
                    console.log("Companies fetched:", res.data.companies); 
                    dispatch(setAllCompanies(res.data.companies
)); 
                }
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };

        FetchAllComapanies(); 
    }, []);
}

export default useFetchCompanies  