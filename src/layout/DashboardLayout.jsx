import React from "react";
import { Outlet, Link } from "react-router";
import Sidebar from "../component/dashboard/Sidebar";
import Footer from "../component/footer/Footer";
import logoImg from "../assets/logo.jpeg";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar fixed on top */}
      <nav className="bg-green-600 px-6 w-full h-16 flex items-center fixed top-0 z-20">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="loanlink" className="w-14 rounded-full" />
          <h1 className="text-3xl font-bold ml-3 text-white">Loanlink</h1>
        </Link>
      </nav>

      {/* Content wrapper */}
      <div className="flex flex-1 pt-16" style={{ minHeight: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div
          className="w-64 bg-gray-100 dark:bg-gray-900"
          style={{ position: 'fixed', top: '64px', bottom: '80px', left: 0 }}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div
          className="flex-1 ml-64 bg-gray-50 dark:bg-gray-800 p-6 overflow-auto"
          style={{ height: 'calc(100vh - 64px - 80px)' }}
        >
          <Outlet />
        </div>
      </div>

      
    </div>
  );
};

export default DashboardLayout;
