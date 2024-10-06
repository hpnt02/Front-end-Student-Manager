import { createSlice } from '@reduxjs/toolkit';

const GiaoVien = createSlice({
    name:"giaovien",
    initialState: {
        giaovien:{
            giaovien:[],
            isFetching: false,
            error: false,
            success: false
        },
        tmgv:{
            isFetching: false,
            error: false,
            success: false
        },
   
    },
    reducers:{
        getGiaoVienStart:(state) =>{
            state.giaovien.isFetching = true
        },
        getGiaoVienSuccess: (state, action) => {
            state.giaovien.isFetching = false;
            state.giaovien.giaovien = action.payload;
            state.giaovien.error = false;
        },
        getGiaoVienFailed: (state) => {
            state.giaovien.isFetching = false;
            state.giaovien.error = true;
        },
       
        TMGVStart: (state) => {
            state.tmgv.isFetching = true;
            state.tmgv.error = false;
            state.tmgv.success = false
        },
       TMGVSuccess: (state, action) => {
            state.tmgv.isFetching = false;
            state.tmgv.error = false;
            state.tmgv.success = true
        },
      TMGVFailed: (state) => {
            state.tmgv.isFetching = false;
            state.tmgv.error = true;
            state.tmgv.success = false
        },
        deleteGiaoVienStart: (state) =>{
            state.giaovien.isFetching = true
            state.giaovien.error = false;
            state.giaovien.success = false
        },
        deleteGiaoVienSuccess: (state,action) => {
            state.giaovien.isFetching = false;
            state.giaovien.error = false;
            state.giaovien.giaovien = state.giaovien.giaovien.items.filter(user => user._id !== action.payload);
            state.giaovien.success = true
        },
        deleteGiaoVienFailed: (state,action) => {
            state.giaovien.isFetching = false;
            state.giaovien.error = true;
            state.giaovien.success = false

        },
        UpdateGiaoVienStart: (state) =>{
            state.giaovien.isFetching = true
        },
        UpdateGiaoVienSuccess: (state, action) => {
            state.giaovien.isFetching = false;
            state.giaovien.error = false;
            const updatedUserIndex = state.giaovien.giaovien.items.findIndex(
              (user) => user._id === action.payload._id
            );
            if (updatedUserIndex !== -1) {
              state.giaovien.giaovien[updatedUserIndex] = action.payload;
            }
          },
       UpdateGiaoVienFailed: (state,action) => {
            state.giaovien.isFetching = false;
            state.giaovien.error = true;
        },
    }
})

export const { getGiaoVienStart,
    getGiaoVienSuccess,
    getGiaoVienFailed,
    TMGVStart,
TMGVSuccess,
TMGVFailed,
deleteGiaoVienStart,
deleteGiaoVienSuccess,
deleteGiaoVienFailed,
UpdateGiaoVienStart,
UpdateGiaoVienSuccess,
UpdateGiaoVienFailed,
} = GiaoVien.actions;

export default GiaoVien.reducer;