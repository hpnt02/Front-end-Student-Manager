import { createSlice } from '@reduxjs/toolkit';

const NamHoc = createSlice({
    name: 'namhoc',
    initialState: {
        namhoc: {
            namhoc: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getNamHocStart: (state) => {
            state.namhoc.isFetching = true;
        },
        getNamHocSuccess: (state, action) => {
            state.namhoc.isFetching = false;
            state.namhoc.namhoc = action.payload;
            state.namhoc.error = false;
        },
        getNamHocFailed: (state) => {
            state.namhoc.isFetching = false;
            state.namhoc.error = true;
        },
    },
});

export const { getNamHocStart, getNamHocSuccess, getNamHocFailed } = NamHoc.actions;

export default NamHoc.reducer;
