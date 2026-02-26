import React, { useState } from 'react';
import { LuDownload, LuChevronDown, LuEye } from 'react-icons/lu';
import TransactioInfoCard from '../../common/cards/TransactioInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload,onEdit }) => {
  // Shuru mein kitne items dikhane hain
  const [displayCount, setDisplayCount] = useState(6);

  const visibleTransactions = transactions?.slice(0, displayCount);

  const handleSeeMore = () => {
    setDisplayCount(prev => prev + 10);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
      {/* Header Section with Integrated Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-slate-800">Income Sources</h5>
        
        <div className="flex items-center gap-3">
          {/* See More Button (Sirf tab dikhega jab mazeed data ho) */}
          {transactions?.length > displayCount && (
            <button 
              onClick={handleSeeMore}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
            >
              <LuEye size={16} />
              See More ({transactions.length - displayCount} left)
            </button>
          )}

          {/* Download Button */}
          <button 
            onClick={onDownload}
            className="flex items-center gap-2 text-sm font-semibold text-purple-600 bg-purple-50 px-4 py-2 rounded-xl hover:bg-purple-100 transition-all"
          >
            <LuDownload size={18} />
            Download
          </button>
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleTransactions?.length > 0 ? (
          visibleTransactions.map((income) => (
            <TransactioInfoCard
              key={income._id}
              label={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              type="income"
             handleDeletebtn={() => onDelete(income._id)}
             handleEditbtn={() => onEdit(income)}
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-50 rounded-2xl">
            <p className="text-slate-400 text-sm font-medium">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncomeList;