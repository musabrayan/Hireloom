import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({ 
    name: "application",
    initialState: { applicants: [] },
    reducers: { 
        setAllApplicants: (state, action) => { 
            state.applicants = action.payload;
        }
    }
});

export const { setAllApplicants } = appSlice.actions;
export default appSlice.reducer;
