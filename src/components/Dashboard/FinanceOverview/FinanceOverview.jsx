import React from "react";
import CustomPieChart from "../../charts/CustomPieChart";
import { addThousandsSeparator } from "../../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

  const balanceData = [
    { name: "Income", value: Number(totalIncome) || 0 },
    { name: "Expenses", value: Number(totalExpense) || 0 },
    { name: "Balance", value: Number(totalBalance) || 0 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-slate-800">Financial Overview</h5>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <CustomPieChart
          data={balanceData}
          label="Total Balance"

          totalAmount={`$${addThousandsSeparator(totalBalance || 0)}`}
          colors={COLORS}
          showTextAnchor={true}
        />
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {balanceData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
            <span className="text-xs text-slate-500 font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceOverview;