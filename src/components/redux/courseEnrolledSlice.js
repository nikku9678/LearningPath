import {createSlice} from "@reduxjs/toolkit"

const courseSlice = createSlice({
    name:"enroll-course",
    initialState:[],
    reducers:{
        add(state,action){
            state.push(action.payload);
        },
        remove(state,action){
            return state.filter((item)=>item.id !== action.payload);
        },
        markCompleted(state, action) {
            const course = state.find(course => course.id === action.payload);
            if (course) {
              course.completed = true;
            }
          }
    }

})

export const {add,remove,markCompleted} = courseSlice.actions;
export default courseSlice.reducer;