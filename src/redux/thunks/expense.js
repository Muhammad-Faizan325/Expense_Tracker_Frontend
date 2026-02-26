import { createAsyncThunk } from "@reduxjs/toolkit";
import { expenseService } from "../../services/expense.service";

// 1. Add Expense
export const addExpenseThunk = createAsyncThunk(
  "expense/add",
  async (expenseData, thunkAPI) => {
    try {
      return await expenseService.addExpense(expenseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error adding expense");
    }
  }
);

// 2. Fetch All Expenses
export const fetchExpensesThunk = createAsyncThunk(
  "expense/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await expenseService.getExpenses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching expenses");
    }
  }
);

// 3. Update Expense
export const updateExpenseThunk = createAsyncThunk(
  "expense/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await expenseService.editExpense(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error updating expense");
    }
  }
);

// 4. Delete Expense
export const removeExpenseThunk = createAsyncThunk(
  "expense/delete",
  async (id, thunkAPI) => {
    try {
      await expenseService.deleteExpense(id);
      return id; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error deleting expense");
    }
  }
);

// 5. Download Expense Excel Thunk
export const downloadExpenseExcelThunk = createAsyncThunk(
  "expense/downloadExcel",
  async (_, thunkAPI) => {
    try {
      // Ye service method blob handle karke browser download trigger karega
      await expenseService.downloadExpenseExcel();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to download expense report"
      );
    }
  }
);