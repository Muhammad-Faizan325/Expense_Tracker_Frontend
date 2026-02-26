import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchIncomesThunk, 
  addIncomeThunk, 
  removeIncomeThunk, 
  updateIncomeThunk, 
  downloadIncomeExcelThunk 
} from "../thunks/income.thunk";

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: [],
    isLoading: false,
    isDownloading: false, // Excel download ke liye alag loading state
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // 1. Fetch Incomes
      .addCase(fetchIncomesThunk.pending, (state) => { 
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(fetchIncomesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incomes = action.payload; // Pure array update
      })
      .addCase(fetchIncomesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 2. Add Income
      .addCase(addIncomeThunk.fulfilled, (state, action) => {
        state.incomes.unshift(action.payload); // Naya record sabse upar
      })

      // 3. Update Income
      .addCase(updateIncomeThunk.fulfilled, (state, action) => {
        const index = state.incomes.findIndex(inc => inc._id === action.payload._id);
        if (index !== -1) {
          state.incomes[index] = action.payload; // Specific record update
        }
      })

      // 4. Remove Income
      .addCase(removeIncomeThunk.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter(inc => inc._id !== action.payload); // ID se filter
      })

      // 5. Download Excel
      .addCase(downloadIncomeExcelThunk.pending, (state) => {
        state.isDownloading = true;
      })
      .addCase(downloadIncomeExcelThunk.fulfilled, (state) => {
        state.isDownloading = false;
      })
      .addCase(downloadIncomeExcelThunk.rejected, (state) => {
        state.isDownloading = false;
      });
  },
});

export default incomeSlice.reducer;