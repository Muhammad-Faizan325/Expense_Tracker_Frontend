import React from 'react';
import { LuTrash2, LuX} from 'react-icons/lu';
import { LucideAlertCircle } from 'lucide-react';

const DeleteAlert = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header with Purple Warning Icon */}
        <div className="flex items-start justify-between p-6 pb-2">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0 border border-emerald-100">
            < LucideAlertCircle size={24} />
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
          >
            <LuX size={20} />
          </button>
        </div>

        {/* Content Section */}
        <div className="px-6 py-4">
          <h3 className="text-xl font-extrabold text-slate-800 mb-2">
            {title || "Confirm Delete"}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {message || "Are you sure you want to delete this record? This action cannot be undone."}
          </p>
        </div>

        {/* Actions Section (Purple Themed Buttons) */}
        <div className="px-6 py-6 bg-slate-50/50 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-800 transition-all shadow-md shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95"
          >
            <LuTrash2 size={18} />
            Delete Now
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeleteAlert;