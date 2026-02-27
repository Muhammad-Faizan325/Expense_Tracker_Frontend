import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../../common/cards/TransactioInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-slate-800">
          Recent Transactions
        </h5>

        <button
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors group"
          onClick={onSeeMore}
        >
          See All
          <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              label={item.category || item.description}
              icon={item.icon} // Ye "utensils" string hai
              date={moment(item.date).format("Do MMM YYYY")} // Screenshot ke mutabiq 1st Feb...
              amount={item.amount}
              type={item.type || "expense"}
              hideDeleteBtn={true}
            />
          ))
        ) : (
          <div className="py-10 text-center">
            <p className="text-slate-400 text-sm italic">
              No recent transactions found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
