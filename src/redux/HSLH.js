import { createSlice } from '@reduxjs/toolkit';

const HSLH = createSlice({
    name:"hslh",
    initialState: {
        hslh:{
            hslh:[],
            isFetching: false,
            error: false
        },
        hstlh:{
            hstlh:[],
            isFetching: false,
            error: false
        },
        tmlhhs:{
            isFetching: false,
            error: false,
            success: false
        },
        
    },
    reducers:{
        getHSLHStart:(state) =>{
            state.hslh.isFetching = true
        },
        getHSLHSuccess: (state, action) => {
            state.hslh.isFetching = false;
            state.hslh.hslh = action.payload;
            state.hslh.error = false;
        },
        getHSLHailed: (state) => {
            state.hslh.isFetching = false;
            state.hslh.error = true;
        },
        getHSTLHStart:(state) =>{
            state.hstlh.isFetching = true
        },
        getHSTLHSuccess: (state, action) => {
            state.hstlh.isFetching = false;
            state.hstlh.hstlh = action.payload;
            state.hstlh.error = false;
        },
        getHSTLHFailed: (state) => {
            state.hstlh.isFetching = false;
            state.hstlh.error = true;
        },
        TMLHHSStart: (state) => {
            state.tmlhhs.isFetching = true;
        },
       TMLHHSSuccess: (state, action) => {
            state.tmlhhs.isFetching = false;
            state.tmlhhs.error = false;
            state.tmlhhs.success = true
        },
      TMLHHSFailed: (state) => {
            state.tmlhhs.isFetching = false;
            state.tmlhhs.error = true;
            state.tmlhhs.success = false
    },
    deleteHSLHStart: (state) =>{
        state.hslh.isFetching = true
    },
    deleteHSLHSuccess: (state,action) => {
        state.hslh.isFetching = false;
        state.hslh.error = false;
        state.hslh.hslh = state.hslh.hslh.filter(user => user._id !== action.payload);
    },
    deleteHSLHFailed: (state,action) => {
        state.hslh.isFetching = false;
        state.hslh.error = true;
    },
    }
})

export const { getHSLHFailed, getHSLHStart, getHSLHSuccess,getHSTLHStart,
    getHSTLHSuccess,
    getHSTLHFailed,
    TMLHHSStart,
TMLHHSSuccess,
TMLHHSFailed,
deleteHSLHStart,
deleteHSLHSuccess,
deleteHSLHFailed
} = HSLH.actions;

export default HSLH.reducer;