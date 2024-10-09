import { createSlice } from '@reduxjs/toolkit';

const HocKy = createSlice({
    name: 'namhoc',
    initialState: {
        hocky: {
            hocky: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getHocKyStart: (state) => {
            state.hocky.isFetching = true;
        },
        getHocKySuccess: (state, action) => {
            state.hocky.isFetching = false;
            state.hocky.hocky = action.payload;
            state.hocky.error = false;
        },
        getHocKyFailed: (state) => {
            state.hocky.isFetching = false;
            state.hocky.error = true;
        },
    },
});

export const { getHocKyStart, getHocKySuccess, getHocKyFailed } = HocKy.actions;

export default HocKy.reducer;
