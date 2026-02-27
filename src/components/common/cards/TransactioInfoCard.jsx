import React from "react";
import { LuTrash2, LuFileText, LuPencilLine } from "react-icons/lu";
import { addThousandsSeparator } from "../../../utils/helper";
import { ICONS_MAP } from "../../../utils/data";

const TransactioInfoCard = ({
  icon,
  label,
  date,
  amount,
  type,
  handleDeletebtn,
  handleEditbtn,
  hideDeleteBtn,
}) => {
  const isIncome = type?.toLowerCase() === "income";

  // FIX: Ensure this function always returns a valid React Element
  const renderIcon = () => {
    // 1. If it's a string (Emoji or Key)
    if (typeof icon === "string" && icon.trim() !== "") {
      const MappedIcon = ICONS_MAP[icon.toLowerCase()];
      if (MappedIcon) return <MappedIcon size={22} />;
      return <span className="text-2xl leading-none">{icon}</span>;
    }

    // 2. If it's already a Component function
    if (typeof icon === "function") {
      const IconComponent = icon;
      return <IconComponent size={22} />;
    }

    // 3. Fallback logic
    const FallbackIcon = isIncome ? ICONS_MAP.income : ICONS_MAP.expense;

    // If ICONS_MAP doesn't have it, use the imported LuFileText directly
    if (FallbackIcon) return <FallbackIcon size={22} />;
    return <LuFileText size={22} />;
  };

  // Safe check for StatusIcon
  const StatusIcon = isIncome ? ICONS_MAP.income : ICONS_MAP.expense;

  return (
    <div className="group bg-white p-4 rounded-2xl border border-slate-100 hover:border-emerald-100 hover:shadow-md hover:shadow-emerald-500/5 transition-all flex items-center justify-between">
      <div className="flex items-center gap-4 overflow-hidden">
        <div
          className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-2xl transition-all duration-300 ${isIncome
              ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
              : "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
            }`}
        >
          {renderIcon()}
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold text-slate-800 truncate leading-tight">
            {label || "Transaction"}
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
            {date}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-2">
        {/* Amount Badge */}
        <div
          className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-black text-[11px] transition-colors ${isIncome
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
            }`}
        >
          {isIncome ? "+" : "-"}${addThousandsSeparator(Number(amount) || 0)}
          {StatusIcon && <StatusIcon size={12} className="opacity-70" />}
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleEditbtn}
            className="p-2 rounded-xl transition-all text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 lg:opacity-0 lg:group-hover:opacity-100 active:scale-90"
          >
            <LuPencilLine size={18} />
          </button>

          {!hideDeleteBtn && (
            <button
              onClick={handleDeletebtn}
              className="p-2 rounded-xl transition-all text-slate-300 hover:text-emerald-800 hover:bg-rose-50 lg:opacity-0 lg:group-hover:opacity-100 active:scale-90"
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