import React from "react";
import moment from "moment";
import { LuArrowRight, LuFileText } from "react-icons/lu";
import TransactionInfoCard from "../../common/cards/TransactioInfoCard";
import { ICONS_MAP } from "../../../utils/data";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  // ERROR FIX: Agar transactions ek object hai jisme array chhupa hai, toh usay nikaalo
  // Agar direct array hai toh wahi use karo.
  const transactionsArray = Array.isArray(transactions)
    ? transactions
    : transactions?.transactions || [];

  console.log("Extracted Array for Mapping:", transactionsArray);

  return (
    <div className="card bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-slate-800 tracking-tight">
          Expenses
        </h5>

        <button
          onClick={onSeeMore}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors group"
        >
          See All
          <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Ab hum extracted array par slice chalayenge */}
        {transactionsArray.slice(0, 5).map((expense) => {
          // Safe Icon Lookup: pehle lowercase check karein, phir default icon
          const iconKey = expense.icon ? expense.icon.toLowerCase() : "";
          const IconComponent = ICONS_MAP[iconKey] || <LuFileText />;
          console.log(IconComponent, "iconkey");

          return (
            <TransactionInfoCard
              key={expense._id}
              label={expense.category} // 👈 'title' ki jagah 'label' likhein
              icon={IconComponent}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
