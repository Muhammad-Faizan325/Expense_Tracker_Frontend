import React, { useState } from "react";
import Input from "../../Inputs/input";
import EmojiPickerPopup from "../../common/EmojiPicker/EmojiPicker";

const AddExpenseForm = ({ onAddExpense, editData }) => {
  // Logic matches Income form for consistency
  const [expense, setExpense] = useState({
    category: editData?.category || "",
    amount: editData?.amount || "",
    date: editData?.date ? new Date(editData.date).toISOString().split('T')[0] : "",
    icon: editData?.icon || "💸", // Default icon for expenses
  });

  const handleUpdate = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div className="">
      {/* Icon Selector - Now left-aligned to match Income Form */}
      <div className="flex flex-col items-start w-full">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
          Expense Category Icon
        </label>

        <div className="flex justify-start items-center w-fit p-1 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
          <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon) => handleUpdate("icon", selectedIcon)}
          />
        </div>
      </div>

      <Input
        label="Expense Category"
        placeholder="Bills, Rent, Food, etc"
        type="text"
        value={expense.category}
        onChange={({ target }) => handleUpdate("category", target.value)}
      />

      <Input
        label="Amount Spent"
        placeholder="0.00"
        type="number"
        value={expense.amount}
        onChange={({ target }) => handleUpdate("amount", target.value)}
      />

      <Input
        label="Transaction Date"
        type="date"
        value={expense.date}
        onChange={({ target }) => handleUpdate("date", target.value)}
      />

      {/* Action Button - Themed to Emerald Vantage Style */}
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-emerald-700 shadow-xl shadow-emerald-200/50 active:scale-95 transition-all w-full sm:w-full"
          onClick={() => onAddExpense(expense)}
        >
          {editData ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;