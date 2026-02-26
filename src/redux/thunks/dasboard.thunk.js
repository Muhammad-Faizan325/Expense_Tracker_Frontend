import { createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardService } from "../../services/dashboard.service";

export const fetchDashboardStats = createAsyncThunk(
    "dashboard/fetchStats",
    async (_, thunkAPI) => {
        try {
            return await dashboardService.getDashboardData();
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);