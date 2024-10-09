import { createSlice } from '@reduxjs/toolkit';

const Diem = createSlice({
    name: 'diem',
    initialState: {
        diem: {
            diem: [],
            isFetching: false,
            error: false,
        },
        diemtheomon: {
            diemtheomon: [],
            isFetching: false,
            error: false,
        },
        tmd: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getDiemStart: (state) => {
            state.diem.isFetching = true;
        },
        getDiemSuccess: (state, action) => {
            state.diem.isFetching = false;
            state.diem.diem = action.payload;
            state.diem.error = false;
        },
        getDiemFailed: (state) => {
            state.diem.isFetching = false;
            state.diem.error = true;
        },
        getDiemTheoMonStart: (state) => {
            state.diemtheomon.isFetching = true;
        },
        getDiemTheoMonSuccess: (state, action) => {
            state.diemtheomon.isFetching = false;
            state.diemtheomon.diemtheomon = action.payload;
            state.diemtheomon.error = false;
        },
        getDiemTheoMonFailed: (state) => {
            state.diemtheomon.isFetching = false;
            state.diemtheomon.error = true;
        },
        TMDiemStart: (state) => {
            state.tmd.isFetching = true;
        },
        TMDiemSuccess: (state, action) => {
            state.tmd.isFetching = false;
            state.tmd.error = false;
            state.tmd.success = true;
        },
        TMDiemFailed: (state) => {
            state.tmd.isFetching = false;
            state.tmd.error = true;
            state.tmd.success = false;
        },
    },
});

export const {
    getDiemFailed,
    getDiemStart,
    getDiemSuccess,
    getDiemTheoMonStart,
    getDiemTheoMonSuccess,
    getDiemTheoMonFailed,
    TMDiemStart,
    TMDiemSuccess,
    TMDiemFailed,
} = Diem.actions;

export default Diem.reducer;
