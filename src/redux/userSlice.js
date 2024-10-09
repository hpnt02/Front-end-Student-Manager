import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        getStudentStart: (state) => {
            state.student.isFetching = true;
        },
        getStudentSuccess: (state, action) => {
            state.student.isFetching = false;
            state.student.allUsers = action.payload;
            state.student.error = false;
        },
        getStudentFailed: (state) => {
            state.student.isFetching = false;
            state.student.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.error = false;
            state.users.allUsers = state.users.allUsers.filter((user) => user._id !== action.payload);
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },
    },
});

export const { getUserFailed, getUserStart, getUserSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailed } =
    userSlice.actions;

export default userSlice.reducer;
