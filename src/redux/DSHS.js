import { createSlice } from '@reduxjs/toolkit';


const DSHS = createSlice({
    name:"dshs",
    initialState: {
        dshs:{
            dshs:[],
            isFetching: false,
            error: false
        },
        tmhs:{
            isFetching: false,
            error: false,
            success: false
        },
        tmn:{
            isFetching: false,
            error: false,
            success: false
        },
        tmk:{
            isFetching: false,
            error: false,
            success: false
        },
        AllNganh:{
           AllNganh:[],
            isFetching: false,
            error: false
        },
        AllKhoa:{
            AllKhoa:[],
             isFetching: false,
             error: false
         }
    },
    reducers:{
        getDSHSStart:(state) =>{
            state.dshs.isFetching = true
        },
        getDSHSSuccess: (state, action) => {
            state.dshs.isFetching = false;
            state.dshs.dshs = action.payload;
            state.dshs.error = false;
        },
        getDSHSFailed: (state) => {
            state.dshs.isFetching = false;
            state.dshs.error = true;
        },
        TMHSStart: (state) => {
            state.tmhs.isFetching = true;
            state.tmhs.error = false;
            state.tmhs.success = false;
        },
       TMHSSuccess: (state, action) => {
            state.tmhs.isFetching = false;
            state.tmhs.error = false;
            state.tmhs.success = true
        },
      TMHSFailed: (state) => {
            state.tmhs.isFetching = false;
            state.tmhs.error = true;
            state.tmhs.success = false
        },
        getNGANHStart:(state) =>{
            state.AllNganh.isFetching = true
        },
        getNGANHSuccess: (state, action) => {
            state.AllNganh.isFetching = false;
            state.AllNganh.AllNganh = action.payload;
            state.AllNganh.error = false;
        },
        getNGANHFailed: (state) => {
            state.AllNganh.isFetching = false;
            state.AllNganh.error = true;
        },
        getKhoaStart:(state) =>{
            state.AllKhoa.isFetching = true
        },
        getKhoaSuccess: (state, action) => {
            state.AllKhoa.isFetching = false;
            state.AllKhoa.AllKhoa = action.payload;
            state.AllKhoa.error = false;
        },
        getKhoaFailed: (state) => {
            state.AllKhoa.isFetching = false;
            state.AllKhoa.error = true;
        },
        deleteUserStart: (state) =>{
            state.dshs.isFetching = true
        },
        deleteUserSuccess: (state,action) => {
            state.dshs.isFetching = false;
            state.dshs.error = false;
            state.dshs.dshs = state.dshs.dshs.items.filter(user => user._id !== action.payload);
        },
        deleteUserFailed: (state,action) => {
            state.dshs.isFetching = false;
            state.dshs.error = true;
        },
       UpdateStart: (state) =>{
            state.dshs.isFetching = true
        },
        UpdateSuccess: (state, action) => {
            state.dshs.isFetching = false;
            state.dshs.error = false;
            const updatedUserIndex = state.dshs.dshs.items.findIndex(
              (user) => user._id === action.payload._id
            );
            if (updatedUserIndex !== -1) {
              state.dshs.dshs[updatedUserIndex] = action.payload;
            }
          },
       UpdateFailed: (state,action) => {
            state.dshs.isFetching = false;
            state.dshs.error = true;
        },
        UpdateNganhStart: (state) =>{
            state.AllNganh.isFetching = true
        },
        UpdateNganhSuccess: (state, action) => {
            state.AllNganh.isFetching = false;
            state.AllNganh.error = false;
            const updatedNganhIndex = state.AllNganh.AllNganh.findIndex(
              (user) => user._id === action.payload._id
            );
            if (updatedNganhIndex !== -1) {
              state.AllNganh.AllNganh[updatedNganhIndex] = action.payload;
            }
          },
          UpdateNganhFailed: (state,action) => {
            state.AllNganh.isFetching = false;
            state.AllNganh.error = true;
        },
       
        TMNStart: (state) => {
            state.tmn.isFetching = true;
        },
       TMNSuccess: (state, action) => {
            state.tmn.isFetching = false;
            state.tmn.error = false;
            state.tmn.success = true
        },
      TMNFailed: (state) => {
            state.tmn.isFetching = false;
            state.tmn.error = true;
            state.tmn.success = false
        },
        deleteNganhStart: (state) =>{
            state.AllNganh.isFetching = true
        },
        deleteNganhSuccess: (state,action) => {
            state.AllNganh.isFetching = false;
            state.AllNganh.error = false;
            state.AllNganh.AllNganh = state.AllNganh.AllNganh.filter(user => user._id !== action.payload);
        },
        deleteNganhFailed: (state,action) => {
            state.AllNganh.isFetching = false;
            state.AllNganh.error = true;
        },
        TMKStart: (state) => {
            state.tmk.isFetching = true;
        },
       TMKSuccess: (state, action) => {
            state.tmk.isFetching = false;
            state.tmk.error = false;
            state.tmk.success = true
        },
      TMKFailed: (state) => {
            state.tmk.isFetching = false;
            state.tmk.error = true;
            state.tmk.success = false
        },
        UpdateKhoaStart: (state) =>{
            state.AllKhoa.isFetching = true
        },
        UpdateKhoaSuccess: (state, action) => {
            state.AllKhoa.isFetching = false;
            state.AllKhoa.error = false;
            const updatedKhoaIndex = state.AllKhoa.AllKhoa.findIndex(
              (user) => user._id === action.payload._id
            );
            if (updatedKhoaIndex !== -1) {
              state.AllKhoa.AllKhoa[updatedKhoaIndex] = action.payload;
            }
          },
          UpdateKhoaFailed: (state,action) => {
            state.AllKhoa.isFetching = false;
            state.AllKhoa.error = true;
        },
        deleteKhoaStart: (state) =>{
            state.AllKhoa.isFetching = true
        },
        deleteKhoaSuccess: (state,action) => {
            state.AllKhoa.isFetching = false;
            state.AllKhoa.error = false;
            state.AllKhoa.AllKhoa = state.AllKhoa.AllKhoa.filter(user => user._id !== action.payload);
        },
        deleteKhoaFailed: (state,action) => {
            state.AllKhoa.isFetching = false;
            state.AllKhoa.error = true;
        },
    }
})

export const { getDSHSFailed, getDSHSStart, getDSHSSuccess,TMHSFailed, TMHSStart, TMHSSuccess,
    getNGANHFailed, getNGANHStart, getNGANHSuccess,getKhoaFailed, getKhoaStart, getKhoaSuccess,
   deleteUserFailed,deleteUserStart,deleteUserSuccess,editUserStart,editUserSuccess,
   editUserFailed,UpdateStart,
   UpdateSuccess,
   UpdateFailed, UpdateNganhStart,
   UpdateNganhSuccess,
   UpdateNganhFailed,TMNStart,
   TMNSuccess,
   TMNFailed,deleteNganhStart,
   deleteNganhSuccess,
   deleteNganhFailed, TMKStart,
   TMKSuccess,
   TMKFailed,UpdateKhoaStart,
   UpdateKhoaSuccess,
   UpdateKhoaFailed,deleteKhoaStart,
   deleteKhoaSuccess,
   deleteKhoaFailed
} = DSHS.actions;

export default DSHS.reducer;