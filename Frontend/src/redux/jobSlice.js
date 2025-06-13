import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
    name: 'jobs',  
    initialState: {
        jobList: [],
        adminJobList:[],
        jobDetails: null ,
        searchJobsByText: ""
    },
    reducers: {
        setJobList: (state, action) => {
            state.jobList = action.payload;
        },
        setJobDetails: (state,action)=>{
            state.jobDetails = action.payload;
        },
        setAdminJobList: (state,action)=>{
            state.adminJobList = action.payload;
        },
        setSearchJobsByText: (state,action)=>{
            state.searchJobsByText = action.payload;
        }

    }
});

export const { setJobList,setJobDetails,setAdminJobList,setSearchJobsByText } = jobsSlice.actions;
export default jobsSlice.reducer;
