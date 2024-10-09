import { createSlice } from '@reduxjs/toolkit';

const Account = createSlice({
    name: 'account',
    initialState: {
        account: {
            account: [],
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getAccountStart: (state) => {
            state.account.isFetching = true;
        },
        getAccountSuccess: (state, action) => {
            state.account.isFetching = false;
            state.account.account = action.payload;
            state.account.error = false;
        },
        getAccountFailed: (state) => {
            state.account.isFetching = false;
            state.account.error = true;
        },
    },
});

export const { getAccountStart, getAccountSuccess, getAccountFailed } = Account.actions;

export default Account.reducer;
