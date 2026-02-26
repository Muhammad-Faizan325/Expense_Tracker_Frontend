import React, { useEffect, useState } from 'react';
import { LuPlus, LuDownload } from "react-icons/lu"; // Icons for buttons
import CustomBarChart from "../../charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome, onDownload, isDownloading }) => {
  const [chartData, setChartData] = useState([]);

  // Effect to process transaction data for the chart
  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h5 className="text-lg font-bold text-slate-800">Income Overview</h5>
          <p className="text-sm text-slate-500 mt-1">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Download Button */}
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
            onClick={onDownload}
            disabled={isDownloading}
          >
            <LuDownload size={18} />
            {isDownloading ? "Exporting..." : "Export"}
          </button>

          {/* Add Income Button */}
          <button 
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-shadow shadow-sm"
            onClick={onAddIncome}
          >
            <LuPlus size={18} />
            Add Income
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex-1 min-h-[300px] mt-4">
        <CustomBarChart 
          data={chartData.slice(-15)} 
         type="month"
        />
      </div>
    </div>
  );
};

export default IncomeOverview;