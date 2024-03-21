import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name:"config",
    initialState:{
        lang:"en",
        toggleUserSetting:false,
    },
    reducers:{
        changeLanguage: (state,action) => {
            state.lang = action.payload;
        },
        changeToggleUserSetting:(state,action) => {
            state.toggleUserSetting = !state.toggleUserSetting;
        }
    },
});

export const {changeLanguage,changeToggleUserSetting} = configSlice.actions;
export default configSlice.reducer;