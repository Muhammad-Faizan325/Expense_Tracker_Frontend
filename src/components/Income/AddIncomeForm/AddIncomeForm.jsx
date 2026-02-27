import React, { useState } from "react";
import Input from "../../Inputs/input";
import EmojiPickerPopup from "../../common/EmojiPicker/EmojiPicker";

const AddIncomeForm = ({ onAddIncome, editData }) => {
  // Renamed state and keys to look distinct from the Expense form
  const [incomeData, setIncomeData] = useState({
    source: editData?.source || "",
    amount: editData?.amount || "",
    date: editData?.date ? new Date(editData.date).toISOString().split('T')[0] : "",
    icon: editData?.icon || "💰", // Default icon for income
  });

  const handleUpdate = (field, val) => {
    setIncomeData({ ...incomeData, [field]: val });
  };

  return (
    <div className="space-y-6">
      {/* Icon Selector with Vantage Styling */}
      <div className="flex flex-col items-start w-full">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 ml-1">
          Revenue Source Icon
        </label>

        <div className="flex justify-start items-center w-fit p-1 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
          <EmojiPickerPopup
            icon={incomeData.icon}
            onSelect={(selected) => handleUpdate("icon", selected)}
          />
        </div>
      </div>

      <Input
        label="Income Source"
        placeholder="Salary, Freelance, Dividends..."
        type="text"
        value={incomeData.source}
        onChange={({ target }) => handleUpdate("source", target.value)}
      />

      <Input
        label="Amount Received"
        placeholder="0.00"
        type="number"
        value={incomeData.amount}
        onChange={({ target }) => handleUpdate("amount", target.value)}
      />

      <Input
        label="Credit Date"
        type="date"
        value={incomeData.date}
        onChange={({ target }) => handleUpdate("date", target.value)}
      />

      <div className="flex justify-end pt-6">
        <button
          type="button"
          className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-emerald-700 shadow-xl shadow-emerald-200/50 active:scale-95 transition-all w-full sm:w-full"
          onClick={() => onAddIncome(incomeData)}
        >
          {editData ? "Confirm Changes" : "Add Income"}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;