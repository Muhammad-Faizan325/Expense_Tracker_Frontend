import React from 'react';

const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-2xl border border-slate-100 min-w-[120px]">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm font-black text-slate-900">
          PKR {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;