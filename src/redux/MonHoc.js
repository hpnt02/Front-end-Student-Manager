import { createSlice } from '@reduxjs/toolkit';

const MonHoc = createSlice({
    name: 'monhoc',
    initialState: {
        monhoc: {
            monhoc: [],
            isFetching: false,
            error: false,
        },
        tmmh: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getMonHocStart: (state) => {
            state.monhoc.isFetching = true;
        },
        getMonHocSuccess: (state, action) => {
            state.monhoc.isFetching = false;
            state.monhoc.monhoc = action.payload;
            state.monhoc.error = false;
        },
        getMonHocFailed: (state) => {
            state.monhoc.isFetching = false;
            state.monhoc.error = true;
        },
        TMMHStart: (state) => {
            state.tmmh.isFetching = true;
        },
        TMMHSuccess: (state, action) => {
            state.tmmh.isFetching = false;
            state.tmmh.error = false;
            state.tmmh.success = true;
        },
        TMMHFailed: (state) => {
            state.tmmh.isFetching = false;
            state.tmmh.error = true;
            state.tmmh.success = false;
        },
        UpdateMonHocStart: (state) => {
            state.monhoc.isFetching = true;
        },
        UpdateMonHocSuccess: (state, action) => {
            state.monhoc.isFetching = false;
            state.monhoc.error = false;
            const updatedUserIndex = state.monhoc.monhoc.findIndex((user) => user._id === action.payload._id);
            if (updatedUserIndex !== -1) {
                state.monhoc.monhoc[updatedUserIndex] = action.payload;
            }
        },
        UpdateMonHocFailed: (state, action) => {
            state.monhoc.isFetching = false;
            state.monhoc.error = true;
        },
        deleteMonHocStart: (state) => {
            state.monhoc.isFetching = true;
        },
        deleteMonHocSuccess: (state, action) => {
            state.monhoc.isFetching = false;
            state.monhoc.error = false;
            state.monhoc.monhoc = state.monhoc.monhoc.items.filter((user) => user._id !== action.payload);
        },
        deleteMonHocFailed: (state, action) => {
            state.monhoc.isFetching = false;
            state.monhoc.error = true;
        },
    },
});

export const {
    getMonHocStart,
    getMonHocSuccess,
    getMonHocFailed,
    TMMHStart,
    TMMHSuccess,
    TMMHFailed,
    UpdateMonHocStart,
    UpdateMonHocSuccess,
    UpdateMonHocFailed,
    deleteMonHocStart,
    deleteMonHocSuccess,
    deleteMonHocFailed,
} = MonHoc.actions;

export default MonHoc.reducer;
