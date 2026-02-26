import React, { useRef, useState, useEffect } from 'react'
import { LuUser, LuTrash, LuPlus } from 'react-icons/lu';

const ProfilePhotoselector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file,"file")
    if (file) {
      setImage(file); // Ye Signup.jsx ki state update karega
      const url = URL.createObjectURL(file);
      console.log("url",url)
      setPreviewUrl(url); // Ye local preview update karega
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className="relative">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-dashed border-slate-300">
            <LuUser className="text-4xl text-slate-400" />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white shadow-md hover:bg-purple-700"
            onClick={() => inputRef.current.click()}
          >
            <LuPlus size={18} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-600"
          />
          <button
            type="button"
            className="absolute -top-1 -right-1 bg-red-500 p-1.5 rounded-full text-white shadow-sm hover:bg-red-600"
            onClick={handleRemoveImage}
          >
            <LuTrash size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoselector;