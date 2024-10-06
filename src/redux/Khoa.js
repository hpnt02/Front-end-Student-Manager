import { createSlice } from '@reduxjs/toolkit';

const Khoa = createSlice({
    name:"khoa",
    initialState: {
        khoa:{
            khoa:null,
            isFetching: false,
            error: false
        },
    },
    reducers:{
        getKhoaStart:(state) =>{
            state.khoa.isFetching = true
        },
        getKhoaSuccess: (state, action) => {
            state.khoa.isFetching = false;
            state.khoa.khoa = action.payload;
            state.khoa.error = false;
        },
        getKhoaFailed: (state) => {
            state.khoa.isFetching = false;
            state.khoa.error = true;
        },
       
      
    }
})

export const { getKhoaFailed, getKhoaStart, getKhoaSuccess,
} = Khoa.actions;

export default Khoa.reducer;