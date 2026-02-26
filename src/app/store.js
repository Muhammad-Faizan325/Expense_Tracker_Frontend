import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth.slice";
import dashboardReducer from "../redux/slices/dashboard.slice";
// 1. Expense reducer ko import karein
import expenseReducer from "../redux/slices/expense.slice"; 
import incomeReducer from "../redux/slices/income.slice"; 
import { createLogger } from "redux-logger";

const logger = createLogger({
    collapsed: true, 
    duration: true,  
});

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dashboard: dashboardReducer,
        // 2. Reducer object mein add karein
        expense: expenseReducer, 
        income:incomeReducer,
    },
  
    middleware: (getDefaultMiddleware) => {
        const middlewares = getDefaultMiddleware();

        // Logger sirf development mode mein chalega
        if (import.meta.env.MODE === 'development') {
            return middlewares.concat(logger);
        }
        
        return middlewares;
    },
});