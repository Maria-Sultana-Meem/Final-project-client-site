import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Link } from "react-router";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1); 
  const limit = 6;

  const { data, isLoading } = useQuery({
    queryKey: ["allLoans", page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans?limit=${limit}&skip=${(page - 1) * limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <LoadingSpinner />;

 
  const totalPages = 5; 

  return (
    <section className="py-30">
      <div className="w-10/12 mx-auto max-w-7xl">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
          Explore All Loan Options
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((loan) => (
            <div
              key={loan._id}
              className=" shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-slate-700"
            >
              <img
                src={loan.image}
                alt={loan.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-green-700">{loan.title}</h3>
                <p className="text-sm font-medium">
                  Category: <span className="font-semibold">{loan.category}</span>
                </p>
                <p className=" text-sm line-clamp-3">{loan.shortDesc}</p>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-blue-600 dark:text-blue-400">
                    Interest: {loan.interest}%
                  </span>
                  <span className="text-red-600 dark:text-red-400">
                    Max: ${loan.maxLimit}
                  </span>
                </div>
                <Link
                  to={`/all-loans/${loan._id}`}
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-md font-medium mt-4 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-2">
          <button
            className="btn btn-sm"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 ? "btn-active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllLoans;
