import axios from "axios";
import apiClient from "./apiClient.service";

const signup = async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
};

const login = async (userData) => {
    const response = await apiClient.post("/auth/login", userData);
    if (response.data.data.accessToken) {
        localStorage.setItem("token", response.data.data.accessToken);
    }
    return response.data;
};

const getUser = async () => {
    const response = await apiClient.get("/auth/get-user");
    return response.data;
};

export const authService = { signup, login, getUser };