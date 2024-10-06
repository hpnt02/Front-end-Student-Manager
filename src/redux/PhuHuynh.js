import { createSlice } from '@reduxjs/toolkit';

const PhuHuynh = createSlice({
    name:"phuhuynh",
    initialState: {
        phuhuynh:{
            phuhuynh:[],
            isFetching: false,
            error: false
        },
        tmph:{
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers:{
        getPhuHuynhStart:(state) =>{
            state.phuhuynh.isFetching = true
        },
        getPhuHuynhSuccess: (state, action) => {
            state.phuhuynh.isFetching = false;
            state.phuhuynh.phuhuynh = action.payload;
            state.phuhuynh.error = false;
        },
        getPhuHuynhFailed: (state) => {
            state.phuhuynh.isFetching = false;
            state.phuhuynh.error = true;
        },
        TMPHStart: (state) => {
            state.tmph.isFetching = true;
        },
       TMPHSuccess: (state, action) => {
            state.tmph.isFetching = false;
            state.tmph.error = false;
            state.tmph.success = true
        },
      TMPHFailed: (state) => {
            state.tmph.isFetching = false;
            state.tmph.error = true;
            state.tmph.success = false
        },
    
}})

export const { getPhuHuynhStart,
    getPhuHuynhSuccess,
    getPhuHuynhFailed,
    TMPHStart,
TMPHSuccess,
TMPHFailed
  
} = PhuHuynh.actions;

export default PhuHuynh.reducer;