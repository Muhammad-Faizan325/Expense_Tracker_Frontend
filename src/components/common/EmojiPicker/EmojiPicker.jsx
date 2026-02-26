import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // ✅ 'w-full flex justify-start' add kiya taake ye hamesha left se shuru ho
    <div className="relative mb-4 w-full flex justify-start">
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl group-hover:bg-purple-50 group-hover:border-purple-200 transition-all">
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <LuImage className="text-slate-400 group-hover:text-purple-500" size={24} />
          )}
        </div>
        
        {/* ✅ text-left ensure karta hai ke label left par hi rahe */}
        <p className="text-sm font-medium text-slate-500 group-hover:text-purple-600 transition-colors text-left">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {isOpen && (
        // ✅ left-0 taake popup bhi left side se hi khule
        <div className="absolute left-0 z-[60] mt-14 shadow-2xl rounded-2xl overflow-hidden border border-slate-100 bg-white">
           <div className="bg-white p-2 flex justify-end border-b">
              <button onClick={(e) => {
                e.stopPropagation(); // Parent click prevent karne ke liye
                setIsOpen(false);
              }} className="text-slate-400 hover:text-slate-600">
                <LuX size={18}/>
              </button>
           </div>
           <EmojiPicker 
             onEmojiClick={(emojiData) => {
               onSelect(emojiData.emoji);
               setIsOpen(false);
             }} 
           />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;