import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_BASE_URL } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useCompanyById  = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_BASE_URL}/get/${companyId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          console.log("Company fetched:", res.data.company);
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.error("Failed to fetch company:", error);
      }
    };

    if (companyId) getSingleCompany();
  }, [companyId, dispatch]);
};

export default useCompanyById;
