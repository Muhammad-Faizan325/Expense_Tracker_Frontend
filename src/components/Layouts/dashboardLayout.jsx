import React, { useState, useEffect } from 'react';
import Navbar from "../common/Navbar/navbar";
import SideMenu from "../common/SideMenu/sideMenu";
import useUser from "../../hooks/userAuth.hook";

const DashboardLayout = ({ children }) => {

  const [activeMenu, setActiveMenu] = useState(window.innerWidth > 1024);
  const { user, loading } = useUser();


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading && !user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      <div className="flex flex-1 relative overflow-hidden">
        {user && (
          <aside
            className={`hidden lg:block border-r border-slate-100 bg-white transition-all duration-300 
            ${activeMenu ? "w-64" : "w-20"}`}
          >
            <SideMenu activeMenu={activeMenu} />
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;