import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Link } from "react-router";

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("all-loans");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="py-30">
      <div className="w-10/12 mx-auto max-w-7xl">
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-12">
          Explore All Loan Options
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loans.map((loan) => (
            <div
              key={loan._id}
              className=" shadow-lg rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-100 dark:border-slate-700"
            >
              {/* Image */}
              <img
                src={loan.image}
                alt={loan.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5 space-y-3">
                {/* Title */}
                <h3 className="text-xl font-bold text-green-700">
                  {loan.title}
                </h3>

                {/* Category */}
                <p className="text-sm font-medium ">
                  Category:{" "}
                  <span className="font-semibold">
                    {loan.category}
                  </span>
                </p>

               
                <p className=" text-sm line-clamp-3">
                  {loan.shortDesc}
                </p>

             
                <hr className="border-gray-200 dark:border-gray-700" />

                
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-blue-600 dark:text-blue-400">
                    Interest: {loan.interest}%  
                  </span>

                  <span className="text-red-600 dark:text-red-400">
                    Max: ${loan.maxLimit}
                  </span>
                </div>

                {/* View Details */}
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
      </div>
    </section>
  );
};

export default AllLoans;
