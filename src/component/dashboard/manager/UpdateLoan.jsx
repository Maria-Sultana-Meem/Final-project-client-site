import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../shared/LoadingSpinner";
import { imageUpload } from "../../../utilis";

const UpdateLoan = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  const { data: loan, isLoading } = useQuery({
    queryKey: ["loanDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-loans/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (loan?.image) {
      setImagePreview(loan.image);
    }
  }, [loan]);

  if (isLoading) return <LoadingSpinner />;

  
  const handleUpdateLoan = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedLoan = {
      title: form.title.value,
      shortDesc: form.description.value,
      category: form.category.value,
      interest: form.interest.value,
      maxLimit: form.maxLimit.value,
      documents: form.documents.value,
      emiPlan: form.emiPlan.value,
      showOnHome: form.showOnHome.checked,
    };

    try {
     
      if (newImageFile) {
        const uploadedURL = await imageUpload(newImageFile);
        updatedLoan.image = uploadedURL;
      }

      const res = await axiosSecure.patch(`/update-loan/${id}`, updatedLoan);

      if (res.data.modifiedCount > 0) {
        toast.success("Loan updated successfully!");
        navigate("/dashboard/manage-loans");
      } else {
        toast.success("No changes made");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update loan");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update Loan</h2>

      <form onSubmit={handleUpdateLoan} className="space-y-5">
        {/* Title */}
        <div>
          <label className="font-semibold">Loan Title</label>
          <input
            type="text"
            name="title"
            defaultValue={loan?.title}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={loan?.shortDesc}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <input
            type="text"
            name="category"
            defaultValue={loan?.category}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Interest */}
        <div>
          <label className="font-semibold">Interest Rate (%)</label>
          <input
            type="number"
            name="interest"
            defaultValue={loan?.interest}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Max Limit */}
        <div>
          <label className="font-semibold">Max Loan Limit</label>
          <input
            type="number"
            name="maxLimit"
            defaultValue={loan?.maxLimit}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Documents */}
        <div>
          <label className="font-semibold">Required Documents</label>
          <input
            type="text"
            name="documents"
            defaultValue={loan?.documents}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* EMI Plans */}
        <div>
          <label className="font-semibold">EMI Plans</label>
          <input
            type="text"
            name="emiPlan"
            defaultValue={loan?.emiPlan}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Show on Home */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="showOnHome"
            defaultChecked={loan?.showOnHome}
            className="checkbox"
          />
          <label className="font-semibold">Show on Home</label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Loan Image</label>

          <div className="my-2">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="w-40 h-40 object-cover rounded-md border mb-2"
              />
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setNewImageFile(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button className="btn btn-primary w-full">Update Loan</button>
      </form>
    </div>
  );
};

export default UpdateLoan;
