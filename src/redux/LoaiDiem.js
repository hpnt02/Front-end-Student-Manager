import { createSlice } from '@reduxjs/toolkit';

const LoaiDiem = createSlice({
    name: 'loaidiem',
    initialState: {
        loaidiem: {
            loaidiem: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getLoaiDiemStart: (state) => {
            state.loaidiem.isFetching = true;
        },
        getLoaiDiemSuccess: (state, action) => {
            state.loaidiem.isFetching = false;
            state.loaidiem.loaidiem = action.payload;
            state.loaidiem.error = false;
        },
        getLoaiDiemFailed: (state) => {
            state.loaidiem.isFetching = false;
            state.loaidiem.error = true;
        },
    },
});

export const { getLoaiDiemStart, getLoaiDiemSuccess, getLoaiDiemFailed } = LoaiDiem.actions;

export default LoaiDiem.reducer;
