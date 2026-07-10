import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, 
    token: null, 
    isAuthenticated: false, 
    loading: false,
};

const authSlice = createSlice({
    name: "auth", 
    initialState, 
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user; 
            state.token = action.payload.token; 
            state.isAuthenticated = true; 
            state.loading = false; 

        }, 
        logout:(state) => {
            state.user = null; 
            state.token = null; 
            state.isAuthenticated = false; 
            state.loading = false; 
        }, 
        setLoading: (state, action) => {
            state.loading = action.payload;
        }, 
        restoreSection: (state, action) => {
            state.user = action.payload.user; 
            state.token = action.payload.token; 
            state.isAuthenticated = !!action.payload.token; 
        }, 
    }, 
}); 

export const {
    login, 
    logout, 
    setLoading, 
    restoreSection, 
} = authSlice.actions; 

export default authSlice.reducer; 
