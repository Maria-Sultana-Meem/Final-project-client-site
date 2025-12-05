import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { Link } from 'react-router';

const AvailableLoan = () => {
  const axiosSecure = useAxiosSecure();

  const { data: loans = [], isLoading } = useQuery({
    queryKey: ['allLoans'],
    queryFn: async () => {
      const res = await axiosSecure.get('all-loans');
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="py-12 bg-gray-50">
      <div className="w-10/12 mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Available Loans
        </h2>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {loans.slice(0, 6).map((loan) => (
            <div
              key={loan._id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={loan.image}
                alt={loan.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {loan.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {loan.shortDesc}
                </p>

                {/* Max Limit */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-green-600 font-semibold">
                    Max Limit: ${loan.maxLimit}
                  </span>

                  {/* View Details */}
                  <Link
                    to={`/loan-details/${loan._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AvailableLoan;
