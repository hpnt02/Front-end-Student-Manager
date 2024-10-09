import { createSlice } from '@reduxjs/toolkit';

const DiemMany = createSlice({
    name: 'diemMany',
    initialState: {
        tmdMany: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        TMManyStart: (state) => {
            state.tmdMany.isFetching = true;
        },
        TMManySuccess: (state, action) => {
            state.tmdMany.isFetching = false;
            state.tmdMany.error = false;
            state.tmdMany.success = true;
        },
        TMManyFailed: (state) => {
            state.tmdMany.isFetching = false;
            state.tmdMany.error = true;
            state.tmdMany.success = false;
        },
    },
});

export const { TMManyStart, TMManySuccess, TMManyFailed } = DiemMany.actions;

export default DiemMany.reducer;
