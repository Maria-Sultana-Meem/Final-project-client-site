import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../shared/LoadingSpinner";

const ManagerProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { logOut } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosSecure
      .get("/manager/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  if (!profile) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto mt-10 px-6">

      {/* Header Card */}
      <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-center">Manager Profile</h2>
        <p className="text-center text-blue-200 mt-1">Your account details</p>

        {/* Profile Image */}
        <div className="flex justify-center mt-6">
          <img
            src={profile.image || "https://i.ibb.co/VxgHtf3/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
          />
        </div>

        <h3 className="text-center text-xl font-semibold mt-4">
          {profile.name}
        </h3>
        <p className="text-center text-blue-200">{profile.email}</p>
      </div>

      {/* Details Card */}
      <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-6 mt-6 border border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold mb-4">Account Details</h3>

        <div className="space-y-3 text-gray-700 dark:text-gray-200">
          <div className="flex justify-between">
            <p className="font-medium">Full Name</p>
            <p>{profile.name}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Email</p>
            <p>{profile.email}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Role</p>
            <p className="font-semibold text-blue-600 dark:text-blue-400 uppercase">
              {profile.role}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="font-medium">Joined</p>
            <p>{profile.created_at}</p>
          </div>
        </div>

        <button
          onClick={logOut}
          className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-lg font-semibold shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ManagerProfile;
