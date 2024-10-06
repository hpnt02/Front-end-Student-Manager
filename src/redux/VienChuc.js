import { createSlice } from '@reduxjs/toolkit';

const VienChuc = createSlice({
    name:"vienchuc",
    initialState: {
        vienchuc:{
            vienchuc:null,
            isFetching: false,
            error: false
        },
    },
    reducers:{
        getVienChucStart:(state) =>{
            state.vienchuc.isFetching = true
        },
        getVienChucSuccess: (state, action) => {
            state.vienchuc.isFetching = false;
            state.vienchuc.vienchuc = action.payload;
            state.vienchuc.error = false;
        },
        getVienChucFailed: (state) => {
            state.vienchuc.isFetching = false;
            state.vienchuc.error = true;
        },
       
      
    }
})

export const { getVienChucFailed, getVienChucStart, getVienChucSuccess,
} = VienChuc.actions;

export default VienChuc.reducer;