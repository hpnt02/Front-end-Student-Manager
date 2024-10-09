import { createSlice } from '@reduxjs/toolkit';

const LopHoc = createSlice({
    name: 'class',
    initialState: {
        class: {
            class: [],
            isFetching: false,
            error: false,
        },
        tmlh: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getClassStart: (state) => {
            state.class.isFetching = true;
        },
        getClassSuccess: (state, action) => {
            state.class.isFetching = false;
            state.class.class = action.payload;
            state.class.error = false;
        },
        getClassFailed: (state) => {
            state.class.isFetching = false;
            state.class.error = true;
        },
        TMLHStart: (state) => {
            state.tmlh.isFetching = true;
        },
        TMLHSuccess: (state, action) => {
            state.tmlh.isFetching = false;
            state.tmlh.error = false;
            state.tmlh.success = true;
        },
        TMLHFailed: (state) => {
            state.tmlh.isFetching = false;
            state.tmlh.error = true;
            state.tmlh.success = false;
        },
    },
});

export const { getClassFailed, getClassStart, getClassSuccess, TMLHFailed, TMLHStart, TMLHSuccess } = LopHoc.actions;

export default LopHoc.reducer;
