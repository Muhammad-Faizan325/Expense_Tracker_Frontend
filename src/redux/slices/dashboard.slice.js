import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardStats } from "../thunks/dasboard.thunk";

const initialState = {
    stats: null, // Income, Expenses, Balance yahan ayenge
    isLoading: false,
    isError: false,
    message: "",
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        resetDashboard: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.stats = action.payload; // API response yahan save hoga
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;