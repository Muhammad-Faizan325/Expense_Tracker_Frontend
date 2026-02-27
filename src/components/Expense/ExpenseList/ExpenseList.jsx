import React, { useState } from 'react';
import { LuDownload, LuChevronDown, LuEye } from 'react-icons/lu';
import TransactioInfoCard from '../../common/cards/TransactioInfoCard';
import moment from 'moment';

const ExpenseList = ({ transactions, onDelete, onEdit, onDownload }) => {
  const [displayCount, setDisplayCount] = useState(6);


  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const visibleTransactions = safeTransactions.slice(0, displayCount);

  const handleSeeMore = () => {
    setDisplayCount(prev => prev + 10);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-slate-800">Expense Logs</h5>

        <div className="flex items-center gap-3">
          {safeTransactions.length > displayCount && (
            <button
              onClick={handleSeeMore}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
            >
              <LuEye size={16} />
              See More ({safeTransactions.length - displayCount} left)
            </button>
          )}

          <button
            onClick={onDownload}
            className="flex items-center gap-2 text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-xl hover:bg-purple-100 transition-all"
          >
            <LuDownload size={18} />
            Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleTransactions.length > 0 ? (
          visibleTransactions.map((expense) => (
            <TransactioInfoCard
              key={expense._id}
              label={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              handleDeletebtn={() => onDelete(expense._id)}

              handleEditbtn={() => onEdit(expense)}
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-50 rounded-2xl">
            <p className="text-slate-400 text-sm font-medium">No expenses recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;