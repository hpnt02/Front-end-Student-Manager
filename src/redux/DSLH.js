import { createSlice } from '@reduxjs/toolkit';

const DSLH = createSlice({
    name: 'dslh',
    initialState: {
        dslh: {
            dslh: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getDSLHStart: (state) => {
            state.dslh.isFetching = true;
        },
        getDSLHSuccess: (state, action) => {
            state.dslh.isFetching = false;
            state.dslh.dslh = action.payload;
            state.dslh.error = false;
        },
        getDSLHFailed: (state) => {
            state.dslh.isFetching = false;
            state.dslh.error = true;
        },
        deleteCLassStart: (state) => {
            state.dslh.isFetching = true;
        },
        deleteCLassSuccess: (state, action) => {
            state.dslh.isFetching = false;
            state.dslh.error = false;
            state.dslh.dslh = state.dslh.dslh.filter((user) => user._id !== action.payload);
        },
        deleteCLassFailed: (state, action) => {
            state.dslh.isFetching = false;
            state.dslh.error = true;
        },
        UpdateClassStart: (state) => {
            state.dslh.isFetching = true;
        },
        UpdateClassSuccess: (state, action) => {
            state.dslh.isFetching = false;
            state.dslh.error = false;
            const updatedClassIndex = state.dslh.dslh.findIndex((user) => user._id === action.payload._id);
            if (updatedClassIndex !== -1) {
                state.dslh.dslh[updatedClassIndex] = action.payload;
            }
        },
        UpdateClassFailed: (state, action) => {
            state.dslh.isFetching = false;
            state.dslh.error = true;
        },
    },
});

export const {
    getDSLHFailed,
    getDSLHStart,
    getDSLHSuccess,
    deleteCLassStart,
    deleteCLassSuccess,
    deleteCLassFailed,
    UpdateClassStart,
    UpdateClassSuccess,
    UpdateClassFailed,
} = DSLH.actions;

export default DSLH.reducer;
