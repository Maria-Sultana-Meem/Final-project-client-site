import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";

// Skeleton Loader Card
const SkeletonCard = () => (
  <div className="animate-pulse shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <div className="h-52 w-full bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-5 space-y-3">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/2 rounded"></div>
      <div className="h-12 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
      <div className="h-10 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
    </div>
  </div>
);

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 8;

  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [interest, setInterest] = useState("");
  const [sort, setSort] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["allLoans", page, search, category, interest, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-loans?limit=${limit}&skip=${(page - 1) * limit}&search=${search}&category=${category}&interest=${interest}&sort=${sort}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  
  const totalPages = data?.total ? Math.ceil(data.total / limit) : 1;

  return (
    <section className="py-30 dark:bg-slate-900">
      <div className="w-10/12 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
          Explore All Loan Options
        </h2>

        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search loan..."
            className="input input-bordered w-full"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <select
            className="select select-bordered"
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Categories</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
          </select>

          <select
            className="select select-bordered"
            onChange={(e) => {
              setInterest(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Interest</option>
            <option value="low">Below 7%</option>
            <option value="mid">2% – 6%</option>
            <option value="high">Above 10%</option>
          </select>

          <select
            className="select select-bordered"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by Interest</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : data.loans.map((loan) => (
                <div
                  key={loan._id}
                  className="shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-slate-700 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={loan.image || "https://i.ibb.co/0jKQx3F/default-loan.jpg"}
                    alt={loan.title}
                    className="h-52 w-full object-cover"
                  />
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-green-700">{loan.title}</h3>
                    <p className="text-sm font-medium">
                      Category: <span className="font-semibold">{loan.category}</span>
                    </p>
                    <p className="text-sm line-clamp-3">{loan.shortDesc}</p>
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
        <div className="flex justify-center mt-12 gap-2">
          <button
            className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600 disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 dark:bg-slate-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600 disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllLoans;
