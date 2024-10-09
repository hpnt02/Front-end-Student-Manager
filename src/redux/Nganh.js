import { createSlice } from '@reduxjs/toolkit';

const Nganh = createSlice({
    name: 'nganh',
    initialState: {
        nganh: {
            nganh: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getNganhStart: (state) => {
            state.nganh.isFetching = true;
        },
        getNganhSuccess: (state, action) => {
            state.nganh.isFetching = false;
            state.nganh.nganh = action.payload;
            state.nganh.error = false;
        },
        getNganhFailed: (state) => {
            state.nganh.isFetching = false;
            state.nganh.error = true;
        },
    },
});

export const { getNganhFailed, getNganhStart, getNganhSuccess } = Nganh.actions;

export default Nganh.reducer;
