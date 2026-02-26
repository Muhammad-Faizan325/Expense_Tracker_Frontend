import React from 'react';

const InfoCard = ({ label, icon: Icon, value, iconColor, iconBg }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center min-h-[140px] relative overflow-hidden">
      
      {/* Background decoration (Halka sa touch premium look ke liye) */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 ${iconBg}`} />

      <div className="flex items-center gap-4">
        {/* Icon - Standard Size */}
        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-xl ${iconBg}`}>
          {Icon && <Icon className={`text-xl ${iconColor}`} />}
        </div>

        {/* Label */}
        <span className="text-slate-500 text-sm font-semibold tracking-tight">
          {label}
        </span>
      </div>

      {/* Amount - Ab ye bahr nahi nikle gi */}
      <div className="mt-4">
        <h3 className="text-xl font-bold text-slate-900 truncate" title={value}>
          {value}
        </h3>
      </div>

    </div>
  );
};

export default InfoCard;