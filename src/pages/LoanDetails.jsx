import { useParams, useNavigate } from "react-router";
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
  const { role, isLoading: roleLoading } = useRole();

  const { data: loan = {}, isLoading } = useQuery({
    queryKey: ["loanDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans/${id}`);
      return res.data;
    },
  });

  if (isLoading || roleLoading) return <LoadingSpinner />;

  const handleApply = () => {
    if (!user) {
      toast.error("You must login first!");
      return navigate("/login");
    }

    if (user?.role === "admin" || user?.role === "manager") {
      return toast.error("Admins & Managers cannot apply for loans!");
    }

    navigate(`/loan-application/${loan._id}`);
  };

  return (
    <div className="w-1o/12 md:w-9/12 mx-auto py-30 max-w-5xl">
      <img
        src={loan.image}
        alt={loan.title}
        className="w-1/2 mx-auto h-72 object-cover rounded-xl shadow-lg"
      />

      <h1 className="text-4xl font-bold text-green-700 mt-6">{loan.title}</h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow bg-white">
          <h3 className="text-gray-500 text-sm">Category</h3>
          <p className="text-lg font-semibold">{loan.category}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-white">
          <h3 className="text-gray-500 text-sm">Interest Rate</h3>
          <p className="text-lg font-semibold">{loan.interest}</p>
        </div>

        <div className="p-4 rounded-lg shadow bg-white">
          <h3 className="text-gray-500 text-sm">Max Limit</h3>
          <p className="text-lg font-semibold">${loan.maxLimit}</p>
        </div>
      </div>

      <p className="mt-6 text-lg leading-relaxed text-gray-700">
        {loan.shortDesc}
      </p>

      {loan.emiPlans && loan.emiPlans.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-3 text-green-700">
            Available EMI Plans
          </h2>

          <ul className="space-y-3">
            {loan.emiPlans.map((plan, index) => (
              <li
                key={index}
                className="p-4 bg-white shadow rounded-lg flex justify-between"
              >
                <span className="font-medium">{plan.duration} months</span>
                <span className="text-green-600 font-semibold">
                  ${plan.monthlyPayment} / month
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        {user && role !== "admin" && role !== "manager" && (
          <button
            onClick={handleApply}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition shadow-md"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default LoanDetails;
