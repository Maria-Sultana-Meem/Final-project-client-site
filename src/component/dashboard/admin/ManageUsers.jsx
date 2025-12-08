import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const [suspendReason, setSuspendReason] = useState("");
  const [suspendFeedback, setSuspendFeedback] = useState("");

  // Load all users
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage-users");
      return res.data;
    },
  });

  // Role Update
  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch(`/update-role/${selectedUser.email}`, {
        role: selectedRole,
      });

      toast.success("Role Updated!");
      setSelectedRole("");
      setSelectedUser(null);

      document.getElementById("update_modal").close();
      refetch();
    } catch {
      toast.error("Failed to update role");
    }
  };

  // Suspend User
  const handleSuspend = async () => {
    try {
      await axiosSecure.patch(`/suspend-user/${selectedUser.email}`, {
        reason: suspendReason,
        feedback: suspendFeedback,
      });

      toast.success("User Suspended!");

      setSuspendReason("");
      setSuspendFeedback("");
      setSelectedUser(null);

      document.getElementById("suspend_modal").close();
      refetch();
    } catch {
      toast.error("Failed to suspend user");
    }
  };

  // Un-Suspend User
  const handleUnsuspend = async (email) => {
    try {
      await axiosSecure.patch(`/update-role/${email}`, {
        role: "borrower",
      });

      toast.success("User Unsuspended!");
      refetch();
    } catch {
      toast.error("Failed to unsuspend");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Manage Users</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} alt="user img" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user.location || "N/A"}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td className="capitalize">
                  {user.role === "admin" && (
                    <span className="badge badge-info">Admin</span>
                  )}
                  {user.role === "manager" && (
                    <span className="badge badge-primary">Manager</span>
                  )}
                  {user.role === "borrower" && (
                    <span className="badge">Borrower</span>
                  )}
                  {user.role === "suspended" && (
                    <span className="badge badge-error">Suspended</span>
                  )}
                </td>

                <td className="flex gap-2">
                  {/* Admin → no action */}
                  {user.role !== "admin" && (
                    <>
                      {/* SUSPENDED USERS */}
                      {user.role === "suspended" ? (
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => handleUnsuspend(user.email)}
                        >
                          Unsuspend
                        </button>
                      ) : (
                        <>
                          {/* UPDATE ROLE */}
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => {
                              setSelectedUser(user);
                              setSelectedRole(user.role);
                              document
                                .getElementById("update_modal")
                                .showModal();
                            }}
                          >
                            Update
                          </button>

                          {/* SUSPEND */}
                          <button
                            className="btn btn-xs btn-outline btn-error"
                            onClick={() => {
                              setSelectedUser(user);
                              document
                                .getElementById("suspend_modal")
                                .showModal();
                            }}
                          >
                            Suspend
                          </button>
                        </>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPDATE ROLE MODAL */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Update User Role</h3>

          {selectedUser && (
            <p className="py-2">
              User: <strong>{selectedUser.name}</strong>
            </p>
          )}

          <select
            className="select select-bordered w-full"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="manager">Manager</option>
            <option value="borrower">Borrower</option>
          </select>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleRoleUpdate}>
              Save
            </button>
            <button
              className="btn"
              onClick={() =>
                document.getElementById("update_modal").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* SUSPEND MODAL */}
      <dialog id="suspend_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Suspend User</h3>

          {selectedUser && (
            <p className="py-2">
              User: <strong>{selectedUser.name}</strong>
            </p>
          )}

          <input
            type="text"
            className="input input-bordered w-full my-2"
            value={suspendReason}
            onChange={(e) => setSuspendReason(e.target.value)}
            placeholder="Reason"
          />

          <textarea
            className="textarea textarea-bordered w-full"
            value={suspendFeedback}
            onChange={(e) => setSuspendFeedback(e.target.value)}
            placeholder="Feedback"
          ></textarea>

          <div className="modal-action">
            <button className="btn btn-error" onClick={handleSuspend}>
              Suspend
            </button>

            <button
              className="btn"
              onClick={() =>
                document.getElementById("suspend_modal").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
