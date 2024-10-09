import { createSlice } from '@reduxjs/toolkit';

const TMLoiViPham = createSlice({
    name: 'tmloivipham',
    initialState: {
        tmlvpham: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
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
    },
});

export const { TMLVPStart, TMLVPSuccess, TMLVPFailed } = TMLoiViPham.actions;

export default TMLoiViPham.reducer;
