import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchExpensesThunk, 
  addExpenseThunk, 
  removeExpenseThunk, 
  updateExpenseThunk, 
  downloadExpenseExcelThunk 
} from "../thunks/expense";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    isLoading: false,
    isDownloading: false, // Excel download ke liye separate loading state
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // 1. Fetch All Expenses
      .addCase(fetchExpensesThunk.pending, (state) => { 
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(fetchExpensesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload; 
      })
      .addCase(fetchExpensesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 2. Add Expense
      .addCase(addExpenseThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses.unshift(action.payload); // Naya expense list ke start mein
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 3. Update Expense
      .addCase(updateExpenseThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateExpenseThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.expenses.findIndex(exp => exp._id === action.payload._id);
        if (index !== -1) {
          state.expenses[index] = action.payload; // Record update
        }
      })
      .addCase(updateExpenseThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 4. Delete Expense
      .addCase(removeExpenseThunk.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(exp => exp._id !== action.payload);
      })

      // 5. Download Excel
      .addCase(downloadExpenseExcelThunk.pending, (state) => {
        state.isDownloading = true;
        state.error = null;
      })
      .addCase(downloadExpenseExcelThunk.fulfilled, (state) => {
        state.isDownloading = false;
      })
      .addCase(downloadExpenseExcelThunk.rejected, (state, action) => {
        state.isDownloading = false;
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;