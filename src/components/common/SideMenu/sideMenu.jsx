import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/auth.slice";
import { MENU_ITEMS } from "../../../utils/data";
import { LuLogOut } from "react-icons/lu";
import useUser  from "../../../hooks/userAuth.hook"; // Hook import kiya

const SideMenu = ({ activeMenu, closeMobileMenu }) => {
    const { user, loading } = useUser(); 
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Jaani, ye function ab handle karega page change aur menu close dono
    const handleNavigation = (path) => {
        navigate(path);
        if (closeMobileMenu) {
            closeMobileMenu(); // Mobile view par menu band karne ke liye
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(logout());
        if (closeMobileMenu) closeMobileMenu();
        navigate("/login");
    };

    return (
        <div className="w-64 h-full bg-white border-r border-slate-100 flex flex-col">
            
            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 py-8">
                <div className="relative">
                    <img 
                        src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.fullName || 'User'}`} 
                        alt="Profile" 
                        className={`w-20 h-20 rounded-full object-cover border-2 border-purple-100 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}
                    />
                </div>
                <h5 className="text-gray-950 font-medium leading-6">
                    {loading ? "Loading..." : (user?.fullName || "User Name")}
                </h5>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 px-4 space-y-2">
                {MENU_ITEMS.filter(item => item.label !== "Logout").map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNavigation(item.path)} // handleNavigation use kiya yahan
                            className={`w-full flex items-center gap-4 px-6 py-3 rounded-lg text-[15px] transition-all
                                ${isActive 
                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-100" 
                                    : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"}`}
                        >
                            <item.icon size={20} />
                            {activeMenu && <span className="font-medium">{item.label}</span>}
                        </button>
                    );
                })}
            </div>

            {/* Logout Button */}
            <div className="px-4 pb-6">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-6 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all group"
                >
                    <LuLogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {activeMenu && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default SideMenu;