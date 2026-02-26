import React, { useEffect, useState } from 'react';
import { LuPlus, LuDownload } from "react-icons/lu"; 
import CustomBarChart from "../../charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../../utils/helper"; // Expense specific helper

const ExpenseOverview = ({ transactions, onAddExpense, onDownload, isDownloading }) => {
  const [chartData, setChartData] = useState([]);

  // Effect to process transaction data for the expense chart
  useEffect(() => {
    // Expense data ko chart format mein convert karna
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  console.log("data",chartData)
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h5 className="text-lg font-bold text-slate-800">Expense Overview</h5>
          <p className="text-sm text-slate-500 mt-1">
            Monitor your spending habits and analyze where your money goes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Export/Download Button */}
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
            onClick={onDownload}
            disabled={isDownloading}
          >
            <LuDownload size={18} />
            {isDownloading ? "Exporting..." : "Export"}
          </button>

          {/* Add Expense Button */}
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-all shadow-sm active:scale-95"
            onClick={onAddExpense}
          >
            <LuPlus size={18} />
            Add Expense
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 min-h-[300px] mt-4">
        {chartData.length > 0 ? (
           <CustomBarChart 
            data={chartData.slice(-15)} 
            type="category"
            // Agar aap chart ka color red/rose rakhna chahte hain for expenses:
            color="#f43f5e" 
          />
        ) : (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-50 rounded-xl">
            <p className="text-slate-400 text-sm">Not enough data to display chart</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseOverview;