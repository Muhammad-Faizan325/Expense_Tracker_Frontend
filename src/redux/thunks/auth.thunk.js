import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/auth.service";

export const signupUser = createAsyncThunk("auth/signup", async (user, thunkAPI) => {
    try {
        return await authService.signup(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const loginUser = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const fetchCurrentUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
    try {
        return await authService.getUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});