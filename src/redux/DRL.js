import { createSlice } from '@reduxjs/toolkit';

const DiemRenLuyen = createSlice({
    name: 'diemrenluyen',
    initialState: {
        diemrenluyen: {
            diemrenluyen: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getDiemRenLuyenStart: (state) => {
            state.diemrenluyen.isFetching = true;
        },
        getDiemRenLuyenSuccess: (state, action) => {
            state.diemrenluyen.isFetching = false;
            state.diemrenluyen.diemrenluyen = action.payload;
            state.diemrenluyen.error = false;
        },
        getDiemRenLuyenFailed: (state) => {
            state.diemrenluyen.isFetching = false;
            state.diemrenluyen.error = true;
        },
    },
});

export const { getDiemRenLuyenFailed, getDiemRenLuyenStart, getDiemRenLuyenSuccess } = DiemRenLuyen.actions;

export default DiemRenLuyen.reducer;
