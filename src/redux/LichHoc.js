import { createSlice } from '@reduxjs/toolkit';

const LichHoc = createSlice({
    name: 'lichhoc',
    initialState: {
        lichhoc: {
            lichhoc: [],
            isFetching: false,
            error: false,
            success: false,
        },
        tmlichhoc: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getLichHocStart: (state) => {
            state.lichhoc.isFetching = true;
        },
        getLichHocSuccess: (state, action) => {
            state.lichhoc.isFetching = false;
            state.lichhoc.lichhoc = action.payload;
            state.lichhoc.error = false;
        },
        getLichHocFailed: (state) => {
            state.lichhoc.isFetching = false;
            state.lichhoc.error = true;
        },
        TMLichHocStart: (state) => {
            state.tmlichhoc.isFetching = true;
            state.tmlichhoc.error = false;
            state.tmlichhoc.success = false;
        },
        TMLichHocSuccess: (state, action) => {
            state.tmlichhoc.isFetching = false;
            state.tmlichhoc.error = false;
            state.tmlichhoc.success = true;
        },
        TMLichHocFailed: (state) => {
            state.tmlichhoc.isFetching = false;
            state.tmlichhoc.error = true;
            state.tmlichhoc.success = false;
        },
        deleteLichHocStart: (state) => {
            state.lichhoc.isFetching = true;
            state.lichhoc.error = false;
            state.lichhoc.success = false;
        },
        deleteLichHocSuccess: (state, action) => {
            state.lichhoc.isFetching = false;
            state.lichhoc.error = false;
            state.lichhoc.success = true;
            state.lichhoc.lichhoc = state.lichhoc.lichhoc.items.filter((user) => user._id !== action.payload);
        },
        deleteLichHocFailed: (state, action) => {
            state.lichhoc.isFetching = false;
            state.lichhoc.error = true;
            state.lichhoc.success = false;
        },
    },
});

export const {
    getLichHocFailed,
    getLichHocStart,
    getLichHocSuccess,
    TMLichHocStart,
    TMLichHocSuccess,
    TMLichHocFailed,
    deleteLichHocStart,
    deleteLichHocSuccess,
    deleteLichHocFailed,
} = LichHoc.actions;

export default LichHoc.reducer;
