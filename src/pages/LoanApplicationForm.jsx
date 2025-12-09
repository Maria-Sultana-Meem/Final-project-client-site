import React, { useState, } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../shared/LoadingSpinner";

const LoanApplicationForm = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedLoanId, setSelectedLoanId] = useState(id || null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    nidPassport: "",
    incomeSource: "",
    monthlyIncome: "",
    loanAmount: "",
    reason: "",
    address: "",
    extraNotes: "",
  });

  
  const { data: allLoans } = useQuery({
    queryKey: ["allLoans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data;
    },
  });

 
  const { data: loan, isLoading } = useQuery({
    queryKey: ["loan", selectedLoanId],
    enabled: !!selectedLoanId,  
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans/${selectedLoanId}`);
      return res.data;
    },
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");
    if (!loan) return toast.error("Please select a loan first");

    const payload = {
      userEmail: user.email,
      loanId: loan._id,
      loanTitle: loan.title,
      interest: loan.interest,
      status: "Pending",
      applicationFee: "Unpaid",
      ...formData,
    };

    try {
      await axiosSecure.post("/loan-application", payload);
      toast.success("Loan Application Submitted Successfully");
      navigate("/dashboard/my-loans");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="py-30 w-10/12 mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Loan Application Form
      </h2>

      {!id && (
        <div className="mb-6">
          <label className="font-semibold">Select Loan Type</label>
          <select
            onChange={(e) => setSelectedLoanId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">-- Select --</option>
            {allLoans?.map((loan) => (
              <option key={loan._id} value={loan._id}>
                {loan.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedLoanId && isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit} className="shadow-lg p-8 rounded-lg space-y-4">

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="font-semibold">User Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Loan Title</label>
              <input
                type="text"
                value={loan?.title || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label className="font-semibold">Interest Rate</label>
              <input
                type="text"
                value={loan?.interest || ""}
                readOnly
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Contact Number</label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label>NID / Passport Number</label>
              <input
                name="nidPassport"
                value={formData.nidPassport}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Income Source</label>
              <input
                name="incomeSource"
                value={formData.incomeSource}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label>Monthly Income</label>
              <input
                type="number"
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label>Loan Amount</label>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label>Reason for Loan</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          
          <div className="space-y-2">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

         
          <div className="space-y-2">
            <label>Extra Notes</label>
            <textarea
              name="extraNotes"
              value={formData.extraNotes}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition w-full"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default LoanApplicationForm;
