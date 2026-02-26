import React, { useState, useEffect } from "react";
import CustomPieChart from "../../charts/CustomPieChart";

const COLORS = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#D8B4FE"]; // Purple theme

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  // Data ko transform karne ka function
 useEffect(() => {
    if (data && data.length > 0) {
      // 1. Data ko group aur sum karne ka logic
      const groupedData = data.reduce((acc, item) => {
        const key = item.source || item.category || "Other";
        
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += Number(item.amount) || 0;
        return acc;
      }, {});

      // 2. Object ko array mein convert karna jo Recharts ko chahiye
      const preparedData = Object.keys(groupedData).map((source) => ({
        name: source,
        value: groupedData[source],
      }));

      console.log("Mapped Chart Data:", preparedData);
      setChartData(preparedData);
    }
  }, [data]);


  return (
    <div className="card col-span-1 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-slate-800">Last 60 Days Income</h5>
      </div>

     <CustomPieChart
   data={chartData}
   label="Total Income"
   totalAmount={`$${totalIncome?.toLocaleString() || 0}`}
   showTextAnchor={true} // <--- Ye add karein
   colors={COLORS}
/>
    </div>
  );
};

export default RecentIncomeWithChart;