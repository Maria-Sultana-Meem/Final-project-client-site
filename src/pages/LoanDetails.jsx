import { useParams, useNavigate, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner";
import { toast } from "react-hot-toast";
import useRole from "../hooks/useRole";

const LoanDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [role, roleLoading] = useRole();

  // Loan Details
  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loanDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans/${id}`);
      return res.data;
    },
  });

  // Related Loans
  const { data: related = [] } = useQuery({
    queryKey: ["relatedLoans", loan.category],
    enabled: !!loan.category,
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans?category=${loan.category}`);
      return res.data;
    },
  });

  if (isLoading || roleLoading) return <LoadingSpinner />;

  const handleApply = () => {
    if (!user) {
      toast.error("You must login first!");
      return navigate("/login");
    }
    if (role === "admin" || role === "manager") {
      return toast.error("Admins & Managers cannot apply!");
    }
    navigate(`/loan-application/${loan._id}`);
  };

  const images = loan.images?.length ? loan.images : [loan.image];

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-30 max-w-7xl">

      {/* ===== Image Gallery ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="loan"
            className="h-64 w-full object-cover rounded-xl shadow"
          />
        ))}
      </div>

      {/* ===== Title ===== */}
      <h1 className="text-4xl font-bold text-green-700 mt-8">{loan.title}</h1>

      {/* ===== Key Information ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-lg shadow">
          <p className="text-sm">Category</p>
          <p className="font-semibold">{loan.category}</p>
        </div>
        <div className="p-4 rounded-lg shadow">
          <p className="text-sm">Interest</p>
          <p className="font-semibold">{loan.interest}%</p>
        </div>
        <div className="p-4 rounded-lg shadow">
          <p className="text-sm">Max Limit</p>
          <p className="font-semibold">${loan.maxLimit}</p>
        </div>
        <div className="p-4 rounded-lg shadow">
          <p className="text-sm">Processing Time</p>
          <p className="font-semibold">{loan.processingTime || "48 hours"}</p>
        </div>
      </div>

      {/* ===== Description / Overview ===== */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">Overview</h2>
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
          {loan.shortDesc}
        </p>
      </div>

      {/* ===== Reviews (Static) ===== */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg shadow">
            <p className="font-semibold">⭐ 5.0 - Ahmed</p>
            <p className="text-sm">Very easy and fast loan approval!</p>
          </div>
          <div className="p-4 rounded-lg shadow">
            <p className="font-semibold">⭐ 4.5 - Riya</p>
            <p className="text-sm">Low interest and simple process.</p>
          </div>
        </div>
      </div>

      {/* ===== Apply Button ===== */}
      {user && role !== "admin" && role !== "manager" && (
        <div className="mt-10">
          <button
            onClick={handleApply}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Apply Now
          </button>
        </div>
      )}

      {/* ===== Related Loans ===== */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6">Related Loans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.slice(0, 4).map((item) => (
            <div key={item._id} className="shadow rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm">{item.category}</p>
                <Link
                  to={`/all-loans/${item._id}`}
                  className="text-green-600 text-sm font-semibold"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default LoanDetails;
