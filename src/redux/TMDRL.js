import { createSlice } from '@reduxjs/toolkit';

const TMDRL = createSlice({
    name:"tmdrl",
    initialState: {
        tmdrl:{
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers:{
        TMDRLStart: (state) => {
            state.tmdrl.isFetching = true;
        },
       TMDRLSuccess: (state, action) => {
            state.tmdrl.isFetching = false;
            state.tmdrl.error = false;
            state.tmdrl.success = true
        },
      TMDRLFailed: (state) => {
            state.tmdrl.isFetching = false;
            state.tmdrl.error = true;
            state.tmdrl.success = false
        },
    
    }
})

export const { 
    TMDRLStart,
TMDRLSuccess,
TMDRLFailed
} = TMDRL.actions;

export default TMDRL.reducer;