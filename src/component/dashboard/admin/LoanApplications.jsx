import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";

const LoanApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["loanApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/loan-applications");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter((app) => app.status === selectedStatus);

  return (
    <div className="p-4 md:p-6 shadow-sm shadow-green-500">
      <h2 className="text-xl md:text-2xl text-green-600 font-bold mb-4 md:mb-5">
        Loan Applications
      </h2>

      {/* Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="select select-bordered w-full sm:w-40"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100">
        <table className="table w-full min-w-[600px] md:min-w-full">
          <thead className="bg-green-500 text-white text-sm md:text-base">
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
              <tr key={app._id} className="text-sm md:text-base">
                <td className="break-all">{app._id}</td>
                <td>
                  {app.firstName} {app.lastName} <br />
                  <span className="text-xs md:text-sm text-gray-500">
                    {app.userEmail}
                  </span>
                </td>
                <td>{app.loanTitle}</td>
                <td>${app.loanAmount}</td>
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
                    className="btn  btn-outline btn-xs md:btn-sm"
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
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box p-4 md:p-6">
            <h3 className="font-bold text-lg md:text-xl mb-3">
              Loan Application Details
            </h3>
            <div className="space-y-2 text-sm md:text-base">
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
                className="btn btn-sm md:btn-md"
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
