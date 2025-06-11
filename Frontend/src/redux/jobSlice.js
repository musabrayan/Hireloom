import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
    name: 'jobs',  
    initialState: {
        jobList: []  
    },
    reducers: {
        setJobList: (state, action) => {
            state.jobList = action.payload;
        }
    }
});

export const { setJobList } = jobsSlice.actions;
export default jobsSlice.reducer;
