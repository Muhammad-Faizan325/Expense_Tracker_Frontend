import React from "react";
import { LuTrash2, LuFileText, LuPencilLine } from "react-icons/lu"; // Pencil icon add kiya
import { addThousandsSeparator } from "../../../utils/helper";
import { ICONS_MAP } from "../../../utils/data";

const TransactioInfoCard = ({
  icon,
  label,
  date,
  amount,
  type,
  handleDeletebtn,
  handleEditbtn, // Edit function receive karein
  hideDeleteBtn,
}) => {
  const isIncome = type?.toLowerCase() === "income";

  const renderIcon = () => {
    if (typeof icon === "string" && icon.trim() !== "") {
      const MappedIcon = ICONS_MAP[icon.toLowerCase()];
      if (MappedIcon) return <MappedIcon size={22} />;
      return <span className="text-2xl leading-none">{icon}</span>;
    }

    if (typeof icon === "function" || typeof icon === "object") {
      const IconComponent = icon;
      return <IconComponent size={22} />;
    }

    const FallbackIcon = isIncome ? ICONS_MAP.income : ICONS_MAP.expense;
    return FallbackIcon ? <FallbackIcon size={22} /> : <LuFileText size={22} />;
  };

  const StatusIcon = isIncome ? ICONS_MAP.income : ICONS_MAP.expense;

  return (
    <div className="group bg-white p-4 rounded-xl border border-slate-100 hover:border-purple-100 hover:shadow-sm transition-all flex items-center justify-between">
      <div className="flex items-center gap-4 overflow-hidden">
        <div
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full transition-colors ${
            isIncome
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {renderIcon()}
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-semibold text-slate-800 truncate">
            {label || "Transaction"}
          </span>
          <span className="text-xs text-slate-400 font-medium">{date}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-2">
        {/* Amount Badge */}
        <div
          className={`px-3 py-1 rounded-lg flex items-center gap-1 font-bold text-xs ${
            isIncome
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {isIncome ? "+" : "-"}${addThousandsSeparator(Number(amount) || 0)}
          {StatusIcon && <StatusIcon size={14} />}
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center">
          {/* Edit Button */}
          <button
            onClick={handleEditbtn}
            className="p-2 rounded-lg transition-all text-slate-400 active:text-purple-600 active:bg-purple-50 lg:text-slate-300 lg:hover:text-purple-600 lg:hover:bg-purple-50 lg:opacity-0 lg:group-hover:opacity-100"
          >
            <LuPencilLine size={18} />
          </button>

          {/* Delete Button */}
          {!hideDeleteBtn && (
            <button
              onClick={handleDeletebtn}
              className="p-2 rounded-lg transition-all text-slate-400 active:text-red-500 active:bg-red-50 lg:text-slate-300 lg:hover:text-red-500 lg:hover:bg-red-50 lg:opacity-0 lg:group-hover:opacity-100"
            >
              <LuTrash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactioInfoCard;