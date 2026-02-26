import axios from "axios";
import apiClient from "./apiClient.service";

const getDashboardData = async () => {
    // Ab token ki tension nahi, interceptor khud handle karega
    const response = await apiClient.get("/dashboard"); 
    return response.data.data;
};

export const dashboardService = {
    getDashboardData,
};