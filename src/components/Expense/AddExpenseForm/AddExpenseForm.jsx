import React, { useState } from "react";
import Input from "../../Inputs/input"; 
import EmojiPickerPopup from "../../common/EmojiPicker/EmojiPicker";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "", // Income mein 'source' tha, yahan 'category'
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div className="space-y-5">
      {/* Icon Picker Section */}
      <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Icon</label>
        <EmojiPickerPopup 
          icon={expense.icon} 
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} 
        />
      </div>

      {/* Expense Category Input */}
      <Input
        label="Expense Category"
        placeholder="Bills, Rent, Food, etc"
        type="text"
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
      />

      {/* Amount Input */}
      <Input
        label="Amount"
        placeholder="0.00"
        type="number"
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
      />

      {/* Date Input */}
      <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />

      {/* Action Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          className="w-full sm:w-auto bg-purple-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          onClick={() => onAddExpense(expense)}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;