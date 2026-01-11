import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Link } from "react-router";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [role] = useRole();

  // Fetch overview
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/overview");
      return res.data;
    },
  });

  // Fetch category data
  const { data: categoryData = [], isLoading: loadingCategory } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/category-loans");
      return res.data; // [{_id: "Personal", count: 40}]
    },
  });

  // Fetch recent loans
  const { data: recentLoans = [], isLoading: loadingRecent } = useQuery({
    queryKey: ["recentLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/recent-loans");
      return res.data;
    },
  });

  if (loadingOverview || loadingCategory || loadingRecent) return <p className="text-center mt-20">Loading...</p>;

  const barData = {
    labels: categoryData.map(c => c._id),
    datasets: [
      {
        label: "Number of Loans",
        data: categoryData.map(c => c.count),
        backgroundColor: ["#16a34a", "#22c55e", "#4ade80", "#86efac"],
      },
    ],
  };

  const pieData = {
    labels: ["Approved", "Pending", "Rejected"],
    datasets: [
      {
        label: "Loan Status",
        data: [overview.approved, overview.pending, overview.rejected],
        backgroundColor: ["#16a34a", "#facc15", "#ef4444"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-green-700">Welcome, {user?.name || user?.displayName || "User"}!</h2>
      <p className="text-gray-700 text-lg">
        {role === "admin" && "You are an Admin. Manage users and loans from here."}
        {role === "manager" && "You are a Manager. Oversee loan applications and borrowers."}
        {role === "borrower" && "You are a Borrower. View your loans and apply for new loans."}
      </p>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        <div className="p-4 bg-green-600 text-white rounded-lg shadow text-center">
          <p>Total Loans</p>
          <p className="text-2xl font-bold">{overview.totalLoans}</p>
        </div>
        <div className="p-4 bg-yellow-400 text-white rounded-lg shadow text-center">
          <p>Pending</p>
          <p className="text-2xl font-bold">{overview.pending}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow text-center">
          <p>Approved</p>
          <p className="text-2xl font-bold">{overview.approved}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow text-center">
          <p>Rejected</p>
          <p className="text-2xl font-bold">{overview.rejected}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-4">Loans by Category</h3>
          <Bar data={barData} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold mb-4">Loan Status Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Recent Loans Table */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow overflow-x-auto">
        <h3 className="font-bold mb-4">Recent Loans</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Interest %</th>
              <th className="px-4 py-2">Max Limit ($)</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentLoans.map((loan, idx) => (
              <tr key={idx} className="text-center border-b">
                <td className="px-4 py-2">{loan.title}</td>
                <td className="px-4 py-2">{loan.category}</td>
                <td className="px-4 py-2">{loan.interest}</td>
                <td className="px-4 py-2">{loan.maxLimit}</td>
                <td className={`px-4 py-2 font-semibold ${loan.status === "Approved" ? "text-green-600" : loan.status === "Pending" ? "text-yellow-500" : "text-red-600"}`}>{loan.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
