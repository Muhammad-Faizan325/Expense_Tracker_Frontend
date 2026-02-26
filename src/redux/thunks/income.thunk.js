import { createAsyncThunk } from "@reduxjs/toolkit";
import { incomeService } from "../../services/income.service";

// 1. Fetch All Incomes Thunk
export const fetchIncomesThunk = createAsyncThunk(
  "income/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await incomeService.getIncomes();
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch income records"
      );
    }
  }
);

// 2. Add New Income Thunk
export const addIncomeThunk = createAsyncThunk(
  "income/add",
  async (incomeData, thunkAPI) => {
    try {
      const response = await incomeService.addIncome(incomeData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add income"
      );
    }
  }
);

// 3. Update/Edit Income Thunk
export const updateIncomeThunk = createAsyncThunk(
  "income/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await incomeService.editIncome(id, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update income"
      );
    }
  }
);

// 4. Delete Income Thunk
export const removeIncomeThunk = createAsyncThunk(
  "income/delete",
  async (id, thunkAPI) => {
    try {
      await incomeService.deleteIncome(id);
      return id; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete income"
      );
    }
  }
);

// 5. Download Excel Thunk
export const downloadIncomeExcelThunk = createAsyncThunk(
  "income/downloadExcel",
  async (_, thunkAPI) => {
    try {
      // Ye service method blob return karega aur file download trigger karega
      await incomeService.downloadIncomeExcel();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to download excel file"
      );
    }
  }
);