import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuSmile, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-start">
      {/* The main button wrapper: 'items-center' fixes the vertical alignment */}
      <div
        className="flex items-center gap-4 cursor-pointer group h-16"
        onClick={() => setIsOpen(true)}
      >
        {/* Icon Box */}
        <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-white border-2 border-slate-100 rounded-2xl group-hover:border-emerald-500 group-hover:bg-emerald-50/30 transition-all duration-300 shadow-sm">
          {icon ? (
            <span className="text-3xl">{icon}</span>
          ) : (
            <LuSmile className="text-slate-300 group-hover:text-emerald-500" size={28} />
          )}
        </div>

        {/* Text Wrapper: 'justify-center' inside 'flex-col' keeps text centered with icon height */}
        <div className="flex flex-col justify-center h-full">
          <p className="text-sm font-bold text-slate-700 group-hover:text-emerald-600 transition-colors leading-tight">
            {icon ? "Change Icon" : "Select Icon"}
          </p>
          <p className="text-[11px] text-slate-400 font-medium leading-tight mt-1">
            Make your category recognizable
          </p>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-[55]" onClick={() => setIsOpen(false)} />

          <div className="absolute left-0 top-20 z-[60] shadow-2xl rounded-[24px] overflow-hidden border border-emerald-100 bg-white animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="bg-emerald-50/50 px-4 py-3 flex justify-between items-center border-b border-emerald-100">
              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Visual Identity</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1 rounded-full hover:bg-white text-emerald-600 transition-colors"
              >
                <LuX size={16} />
              </button>
            </div>
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                onSelect(emojiData.emoji);
                setIsOpen(false);
              }}
              height={400}
              width={320}
              previewConfig={{ showPreview: false }}
              skinTonesDisabled
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmojiPickerPopup;