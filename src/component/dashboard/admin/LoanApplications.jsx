import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";

const LoanApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Fetch all loan applications
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["loanApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications"); // backend API
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Filter applications by status
  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Loan Applications</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="select select-bordered w-40"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Loan Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app._id}>
                <td>{app._id}</td>
                <td>
                  {app.firstName || "N/A"} <br />
                  <span className="text-sm text-gray-500">{app.userEmail}</span>
                </td>
                <td>{app.loanTitle}</td>
                <td>{app.loanAmount}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "Approved"
                        ? "badge-success"
                        : app.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedApplication(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedApplication && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">
              Loan Application Details
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Loan ID:</strong> {selectedApplication._id}
              </p>
              <p>
                <strong>User:</strong> {selectedApplication.userName} (
                {selectedApplication.userEmail})
              </p>
              <p>
                <strong>Category:</strong> {selectedApplication.category}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedApplication.amount}
              </p>
              <p>
                <strong>Status:</strong> {selectedApplication.status}
              </p>
              <p>
                <strong>Application Fee Status:</strong>{" "}
                {selectedApplication.applicationFeeStatus}
              </p>
              <p>
                <strong>Additional Info:</strong>{" "}
                {selectedApplication.additionalInfo || "N/A"}
              </p>
            </div>
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default LoanApplications;
