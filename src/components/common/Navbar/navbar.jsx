import React from 'react';
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi"; // Using MenuAlt2 for a modern look
import SideMenu from "../SideMenu/sideMenu";

const Navbar = ({ activeMenu, setActiveMenu }) => {

    return (
        <div className="relative">
            {/* Navbar with subtle Emerald border and blur */}
            <nav className="flex items-center gap-4 bg-white/90 border-b border-emerald-50/50 backdrop-blur-md py-4 px-6 sticky top-0 z-50 h-[64px]">

                {/* Mobile Toggle Button */}
                <button
                    className="lg:hidden p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors focus:outline-none"
                    onClick={() => setActiveMenu(!activeMenu)}
                >
                    {activeMenu ? (
                        <HiOutlineX className="text-xl" />
                    ) : (
                        <HiOutlineMenuAlt2 className="text-xl" />
                    )}
                </button>

                {/* Logo & Name */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center rotate-3 shadow-md shadow-emerald-200">
                        <span className="text-white text-sm font-black italic">V</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                        VANTAGE
                    </h2>
                </div>
            </nav>

            {/* Mobile Sidebar Overlay & Container */}
            <div className={`lg:hidden transition-all duration-300 ${activeMenu ? "opacity-100 visible" : "opacity-0 invisible"}`}>

                {/* Backdrop with a blur to match Vantage premium feel */}
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30"
                    onClick={() => setActiveMenu(false)}
                />

                {/* Sidebar Container */}
                <div className={`fixed top-[64px] left-0 w-72 h-[calc(100vh-64px)] bg-white z-40 shadow-2xl transition-transform duration-300 transform ${activeMenu ? "translate-x-0" : "-translate-x-full"}`}>
                    <SideMenu activeMenu={true} closeMobileMenu={() => setActiveMenu(false)} />

                    {/* Bottom Sidebar Accent */}
                    <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-50">
                        <p className="text-[10px] text-center font-bold text-slate-300 uppercase tracking-widest">
                            Powered by Vantage
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;