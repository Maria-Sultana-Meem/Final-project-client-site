import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageLoans = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Load all loans
  const { data: loans = [], refetch } = useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-loans");
      return res.data;
    },
  });

  // Show on Home Toggle
  const handleShowOnHomeToggle = async (loan) => {
    try {
      const updatedLoan = { showOnHome: !loan.showOnHome };
      await axiosSecure.patch(`/update-loan/${loan._id}`, updatedLoan);
      toast.success(
        `Loan "${loan.title}" is now ${updatedLoan.showOnHome ? "shown" : "hidden"} on Home`
      );
      refetch();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update show on home");
    }
  };

  // Delete loan
  const handleDelete = (loanId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/delete-loan/${loanId}`);
          toast.success("Loan deleted successfully");
          refetch();
          Swal.fire("Deleted!", "The loan has been deleted.", "success");
        } catch (err) {
          console.log(err);
          toast.error("Failed to delete loan");
        }
      }
    });
  };

  // Open update modal
  const openUpdateModal = (loan) => {
    setSelectedLoan(loan);
    setShowUpdateModal(true);
  };

  // Close modal
  const closeUpdateModal = () => {
    setSelectedLoan(null);
    setShowUpdateModal(false);
  };

  // Update loan handler
  const handleUpdateLoan = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedLoan = {
      title: form.title.value,
      category: form.category.value,
      interest: form.interest.value,
      maxLimit: form.maxLimit.value,
      shortDesc: form.shortDesc.value,
    };

    try {
      await axiosSecure.patch(`/update-loan/${selectedLoan._id}`, updatedLoan);
      toast.success("Loan updated successfully");
      refetch();
      closeUpdateModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update loan");
    }
  };

  return (
    <div className="p-6 shadow-sm shadow-green-500">
      <h2 className="text-2xl text-green-500 font-bold mb-5">Manage Loans</h2>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead className="bg-green-500 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    src={loan.image}
                    alt={loan.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td>{loan.title}</td>
                <td>{loan.interest}%</td>
                <td>{loan.category}</td>
                <td>{loan.createdBy || "Admin"}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={loan.showOnHome || false}
                    onChange={() => handleShowOnHomeToggle(loan)}
                  />
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs bg-green-500 text-white"
                    onClick={() => openUpdateModal(loan)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-xs bg-red-500 text-white"
                    onClick={() => handleDelete(loan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showUpdateModal && selectedLoan && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold mb-4">Update Loan</h3>
            <form onSubmit={handleUpdateLoan} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={selectedLoan.title}
                className="input input-bordered w-full"
                placeholder="Title"
                required
              />
              <input
                type="text"
                name="category"
                defaultValue={selectedLoan.category}
                className="input input-bordered w-full"
                placeholder="Category"
                required
              />
              <input
                type="text"
                name="interest"
                defaultValue={selectedLoan.interest}
                className="input input-bordered w-full"
                placeholder="Interest"
                required
              />
              <input
                type="number"
                name="maxLimit"
                defaultValue={selectedLoan.maxLimit}
                className="input input-bordered w-full"
                placeholder="Max Loan Limit"
                required
              />
              <textarea
                name="shortDesc"
                defaultValue={selectedLoan.shortDesc}
                className="textarea textarea-bordered w-full"
                placeholder="Short Description"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={closeUpdateModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageLoans;
