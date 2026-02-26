import React, { useState } from "react";
import Input from "../../Inputs/input"; 
import EmojiPickerPopup from "../../common/EmojiPicker/EmojiPicker";

const AddExpenseForm = ({ onAddExpense, editData }) => {
  const [expense, setExpense] = useState({
    category: editData?.category || "",
    amount: editData?.amount || "",
    date: editData?.date ? new Date(editData.date).toISOString().split('T')[0] : "",
    icon: editData?.icon || "",
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  return (
    <div className="space-y-5">
      {/* Icon Picker Section - Left Aligned Wrapper */}
      <div className="flex flex-col items-start w-full">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">
          Select Icon
        </label>
        
        {/* Is div ko width-fit di hai taake ye poori line na ghaire aur left par hi rahe */}
        <div className="flex justify-start items-center w-fit">
          <EmojiPickerPopup 
            icon={expense.icon} 
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)} 
          />
        </div>
      </div>

      <Input
        label="Expense Category"
        placeholder="Bills, Rent, Food, etc"
        type="text"
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
      />

      <Input
        label="Amount"
        placeholder="0.00"
        type="number"
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
      />

      <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />

      <div className="flex justify-end pt-4">
        <button
          type="button"
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 active:scale-95 transition-all w-full sm:w-auto"
          onClick={() => onAddExpense(expense)}
        >
          {editData ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;