import React from "react";
import { Outlet, Link } from "react-router";
import Sidebar from "../component/dashboard/Sidebar";
import Footer from "../component/footer/Footer";
import logoImg from "../assets/logo.jpeg";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">

      <div className="flex flex-1">

        {/* Sidebar */}
      <div>
          <Sidebar/>
      </div>

        {/* Main Content */}
        <div className="flex-1">

          {/* Navbar */}
          <nav className="navbar bg-green-600 px-6 w-full">
            <Link to="/" className="flex items-center">
              <img src={logoImg} alt="loanlink" className="w-14 rounded-full" />
              <h1 className="text-3xl font-bold ml-3">Loanlink</h1>
            </Link>
          </nav>

          {/* Outlet content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>

      </div>

     <div>
       <Footer />
     </div>
    </div>
  );
};

export default DashboardLayout;