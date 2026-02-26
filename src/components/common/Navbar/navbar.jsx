import React from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "../SideMenu/sideMenu";

const Navbar = ({ activeMenu, setActiveMenu }) => {
    // Local state [openSideMenu] hata diya, ab direct [activeMenu] use hoga

    return (
        <div className="relative">
            {/* Navbar z-50 taake hamesha toggle button upar rahe */}
            <nav className="flex items-center gap-5 bg-white/80 border-b border-gray-200/50 backdrop-blur-[12px] py-4 px-6 sticky top-0 z-50 h-[61px]">
                <button
                    className="block lg:hidden text-black focus:outline-none"
                    onClick={() => setActiveMenu(!activeMenu)} // DashboardLayout wala state change hoga
                >
                    {activeMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )}
                </button>

                <h2 className="text-lg font-medium text-black tracking-tight">
                    Expense Tracker
                </h2>
            </nav>

         
            {/* activeMenu true hai tabhi sidebar aur backdrop dikhega (mobile par) */}
           <div className={`lg:hidden ${activeMenu ? "block" : "hidden"}`}>
    {/* Yeh block tabhi chalega jab mobile screen hogi aur activeMenu true hoga */}
    <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setActiveMenu(false)} />
    <div className="fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white z-40 shadow-xl">
        <SideMenu activeMenu={true} closeMobileMenu={() => setActiveMenu(false)} />
    </div>
</div>
        </div>
    );
};

export default Navbar;