import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-5">
      <label className="text-[13px] text-slate-500 ml-1">{label}</label>
      <div className="relative mt-2">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-slate-50 text-slate-900 text-[14px] px-4 py-3 rounded-xl outline-none border border-transparent focus:border-cyan-400 transition-all"
        />
        
        {type === "password" && (
          <div 
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-cyan-500"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;