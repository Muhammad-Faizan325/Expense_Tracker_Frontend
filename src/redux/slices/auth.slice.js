import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser, fetchCurrentUser } from "../thunks/auth.thunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
        success: false, // Signup success track karne ke liye
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            state.token = null;
            state.success = false;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- SIGNUP CASES ---
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true; // Taake hum UI mein redirect ya alert dikha saken
                // Note: Agar backend signup par hi user/token bhej raha hai toh yahan state update kar sakte hain
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // --- LOGIN CASES ---
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.token = action.payload.data.accessToken;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- GET USER CASES ---
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null; // Agar token expire ho gaya ho toh
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;