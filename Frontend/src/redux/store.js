import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import jobsSlice from './jobSlice'
 const store = configureStore({
    reducer:{
           auth: authSlice,
           jobs: jobsSlice
    }
 })

 export default store;