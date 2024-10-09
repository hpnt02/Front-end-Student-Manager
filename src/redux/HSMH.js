import { createSlice } from '@reduxjs/toolkit';

const HSMH = createSlice({
    name: 'hsmh',
    initialState: {
        hsmh: {
            hsmh: [],
            isFetching: false,
            error: false,
        },
        tmhsmh: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getHSMHStart: (state) => {
            state.hsmh.isFetching = true;
        },
        getHSMHSuccess: (state, action) => {
            state.hsmh.isFetching = false;
            state.hsmh.hsmh = action.payload;
            state.hsmh.error = false;
        },
        getHSMHailed: (state) => {
            state.hsmh.isFetching = false;
            state.hsmh.error = true;
        },
        TMHSMHStart: (state) => {
            state.tmhsmh.isFetching = true;
        },
        TMHSMHSuccess: (state, action) => {
            state.tmhsmh.isFetching = false;
            state.tmhsmh.error = false;
            state.tmhsmh.success = true;
        },
        TMHSMHFailed: (state) => {
            state.tmhsmh.isFetching = false;
            state.tmhsmh.error = true;
            state.tmhsmh.success = false;
        },
    },
});

export const { getHSMHFailed, getHSMHStart, getHSMHSuccess, TMHSMHStart, TMHSMHSuccess, TMHSMHFailed } = HSMH.actions;

export default HSMH.reducer;
