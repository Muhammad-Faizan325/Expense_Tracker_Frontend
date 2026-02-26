import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50 backdrop-blur-sm">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800">
              {title}
            </h3>
            <button
              type="button"
              className="tex\\\\\a\t-slate-400 bg-transparent hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors"
              onClick={onClose}
            >
              <LuX size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-6 space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;