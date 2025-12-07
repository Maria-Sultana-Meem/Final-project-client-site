import React from "react";
import { FaEnvelope, FaIdBadge, FaUser, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";

const BorrowerProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [role] = useRole();

  const handleLogout = () => {
    logOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const userName = user?.name || user?.displayName || "Unknown User";

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center gap-6 border-b pb-6">
        <div>
          <img
            src={user?.image || user?.photoURL || "https://via.placeholder.com/150"}
            alt="User"
            className="w-28 h-28 rounded-full object-cover border-4 border-green-300 shadow-md"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
          <p className="text-sm mt-1 px-3 py-1 rounded-full inline-block bg-green-100 text-green-600">
            {role?.toUpperCase() || ""}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <FaUser className="text-green-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{userName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <FaEnvelope className="text-blue-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <FaIdBadge className="text-purple-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Account Role</p>
            <p className="font-medium capitalize">{role}</p>
          </div>
        </div>

      </div>

      <div className="text-end mt-8">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-fit ml-auto"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

    </div>
  );
};

export default BorrowerProfile;
