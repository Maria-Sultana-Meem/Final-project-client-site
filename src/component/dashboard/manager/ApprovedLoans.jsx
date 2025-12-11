// ApprovedLoans.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";

const ApprovedLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: approvedLoans = [], isLoading } = useQuery({
    queryKey: ["approvedLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("loan-applications/approved");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 shadow-sm shadow-green-500">
      <h2 className="text-2xl text-green-500 font-bold mb-6">Approved Loan Applications</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-green-500 text-white">
            <tr>
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Approved At</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {approvedLoans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id}</td>

                <td>
                  <p className="font-semibold">
                    {loan.firstName} {loan.lastName}
                  </p>
                  <small>{loan.userEmail}</small>
                </td>

                <td>{loan.loanAmount} BDT</td>

                <td>
                  {loan.approvedAt
                    ? new Date(loan.approvedAt).toLocaleString()
                    : "N/A"}
                </td>

                <td className="text-green-600 font-bold">{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedLoans;
