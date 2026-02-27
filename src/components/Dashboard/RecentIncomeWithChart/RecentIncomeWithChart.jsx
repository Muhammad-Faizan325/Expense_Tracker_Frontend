import React, { useState, useEffect } from "react";
import CustomPieChart from "../../charts/CustomPieChart";

// Emerald Theme Colors: Deep Emerald to Light Mint
const EMERALD_COLORS = ["#059669", "#10B981", "#34D399", "#A7F3D0"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // 1. Group and sum logic
      const groupedData = data.reduce((acc, item) => {
        const key = item.source || item.category || "Other";
        if (!acc[key]) acc[key] = 0;
        acc[key] += Number(item.amount) || 0;
        return acc;
      }, {});

      // 2. Convert to Recharts format
      const preparedData = Object.keys(groupedData).map((source) => ({
        name: source,
        value: groupedData[source],
      }));

      setChartData(preparedData);
    }
  }, [data]);

  return (
    <div className="card col-span-1 p-6 bg-white rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col mb-2">
        <h5 className="text-lg font-bold text-slate-800">Income Distribution</h5>
        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Last 60 Days
        </p>
      </div>

      <div className="relative h-[300px] w-full">
        {chartData.length > 0 ? (
          <CustomPieChart
            data={chartData}
            label="Total Revenue"
            totalAmount={`$${totalIncome?.toLocaleString() || 0}`}
            showTextAnchor={true}
            colors={EMERALD_COLORS}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-300 text-sm italic">No data available</p>
          </div>
        )}
      </div>

      {/* Optional: Legend indicator for Emerald theme */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {chartData.slice(0, 4).map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: EMERALD_COLORS[index % EMERALD_COLORS.length] }}
            />
            <span className="text-[10px] font-bold text-slate-500 uppercase truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentIncomeWithChart;