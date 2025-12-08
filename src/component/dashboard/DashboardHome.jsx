
import React from "react";

import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { user } = useAuth(); 
  const [role]=useRole()

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-green-700">
        Welcome, {user?.name || user?.displayName || "User"}!
      </h2>
      <p className="text-gray-700 text-lg">
        {role === "admin" && "You are an Admin. Manage users and loans from here."}
        {role === "manager" && "You are a Manager. Oversee loan applications and borrowers."}
        {role === "borrower" && "You are a Borrower. View your loans and apply for new loans."}
       
      </p>

      {/* Quick links / shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {role === "admin" && (
          <>
            <Link to="/dashboard/manage-users" className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center font-semibold">
              Manage Users
            </Link>
            <Link to="/dashboard/all-loans" className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center font-semibold">
              View All Loans
            </Link>
          </>
        )}

        {role === "manager" && (
          <>
            <Link to="/dashboard/all-loans" className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center font-semibold">
              View All Loans
            </Link>
          </>
        )}

        {role === "borrower" && (
          <>
            <Link to="/dashboard/my-loans" className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center font-semibold">
              My Loans
            </Link>
            <Link to="/all-loans" className="p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 text-center font-semibold">
              Apply for New Loan
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
