import { createSlice } from '@reduxjs/toolkit';

const LoiViPham = createSlice({
    name: 'loivipham',
    initialState: {
        loivipham: {
            loivipham: [],
            isFetching: false,
            error: false,
        },
        tmlvpham: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getLoiViPhamStart: (state) => {
            state.loivipham.isFetching = true;
        },
        getLoiViPhamSuccess: (state, action) => {
            state.loivipham.isFetching = false;
            state.loivipham.loivipham = action.payload;
            state.loivipham.error = false;
        },
        getLoiViPhamFailed: (state) => {
            state.loivipham.isFetching = false;
            state.loivipham.error = true;
        },
        TMLVPStart: (state) => {
            state.tmlvpham.isFetching = true;
        },
        TMLVPSuccess: (state, action) => {
            state.tmlvpham.isFetching = false;
            state.tmlvpham.error = false;
            state.tmlvpham.success = true;
        },
        TMLVPFailed: (state) => {
            state.tmlvpham.isFetching = false;
            state.tmlvpham.error = true;
            state.tmlvpham.success = false;
        },
        deleteLoiViPhamStart: (state) => {
            state.loivipham.isFetching = true;
        },
        deleteLoiViPhamSuccess: (state, action) => {
            state.loivipham.isFetching = false;
            state.loivipham.error = false;
            state.loivipham.loivipham = state.loivipham.loivipham.items.filter((user) => user._id !== action.payload);
        },
        deleteLoiViPhamFailed: (state, action) => {
            state.loivipham.isFetching = false;
            state.loivipham.error = true;
        },
    },
});

export const {
    getLoiViPhamStart,
    getLoiViPhamSuccess,
    getLoiViPhamFailed,
    TMLVPStart,
    TMLVPSuccess,
    TMLVPFailed,
    deleteLoiViPhamStart,
    deleteLoiViPhamSuccess,
    deleteLoiViPhamFailed,
} = LoiViPham.actions;

export default LoiViPham.reducer;
