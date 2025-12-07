import React from "react";
import { Link, useNavigate } from "react-router";
import { FcHome } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../shared/LoadingSpinner";
import UserSidebar from "./roleBasedRoute/UserSidebar";
import ManagerSidebar from "./roleBasedRoute/ManagerSidebar";
import AdminSidebar from "./roleBasedRoute/AdminSidebar";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const [role, isRoleLoading] = useRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  if (isRoleLoading) return <LoadingSpinner />;

 
  const handleLogout = async () => {
    await logOut();    
    navigate("/");     
  };

  return (
    <aside
      className="
        bg-base-200 p-4 min-h-screen 
        w-16 md:w-20 lg:w-52 
        flex flex-col justify-between
        transition-all duration-300
      "
    >
    
      <ul className="menu w-full">

        {/* Homepage */}
        <li className="group">
          <Link to="/" className="flex items-center gap-3">
            <FcHome size={30} />
            <span className="hidden lg:inline-block">Homepage</span>

            <span className="lg:hidden absolute left-16 bg-black text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100">
              Homepage
            </span>
          </Link>
        </li>

        {/* Role Based Sidebar */}
        {role === "borrower" && <UserSidebar />}
        {role === "manager" && <ManagerSidebar />}
        {role === "admin" && <AdminSidebar />}
      </ul>

    
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-red-200 transition group"
        >
          <FiLogOut size={28} className="text-red-500" />

          <span className="hidden lg:inline-block text-red-600">Logout</span>

          <span className="lg:hidden absolute left-16 bg-black text-white rounded px-2 py-1 text-sm opacity-0 group-hover:opacity-100">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
