import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseEnrolledSlice.js";
const store = configureStore({
    reducer:{
        course:courseReducer,
        
    }
})

export default store;