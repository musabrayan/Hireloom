import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
    name: 'jobs',  
    initialState: {
        jobList: [],
        jobDetails: null 
    },
    reducers: {
        setJobList: (state, action) => {
            state.jobList = action.payload;
        },
        setJobDetails: (state,action)=>{
            state.jobDetails = action.payload;
        }
    }
});

export const { setJobList,setJobDetails  } = jobsSlice.actions;
export default jobsSlice.reducer;
