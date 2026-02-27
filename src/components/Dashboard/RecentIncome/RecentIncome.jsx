import React from 'react';
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../common/cards/TransactioInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card p-6 bg-white rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-slate-800">Recent Income</h5>
        <button
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors group"
          onClick={onSeeMore}
        >
          See All
          <LuArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="space-y-4 flex-1">
        {transactions && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              label={item.source} // title/label update
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn={true}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <p className="text-sm">No recent income found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;