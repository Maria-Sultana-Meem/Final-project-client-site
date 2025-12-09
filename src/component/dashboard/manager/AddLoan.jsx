import React, { useState } from "react";
import toast from "react-hot-toast";

import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utilis";

const AddLoan = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleAddLoan = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const title = form.title.value;
    const shortDesc = form.shortDesc.value;
    const category = form.category.value;
    const interest = parseFloat(form.interest.value);
    const maxLimit = parseFloat(form.maxLimit.value);

    const requiredDocs = form.requiredDocs.value.split(",").map(doc => doc.trim());
    const emiPlans = form.emiPlans.value.split(",").map(v => parseInt(v));

    const showOnHome = form.showOnHome.checked;

    const image = form.image.files[0];

    try {
  
      const imageUrl = await imageUpload(image);

      const loanData = {
        title,
        shortDesc,
        category,
        interest,
        maxLimit,
        requiredDocs,
        emiPlans,
        image: imageUrl,
        showOnHome,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/add-loan", loanData);

      if (res.data.insertedId) {
        toast.success("Loan added successfully!");
        navigate("/dashboard/manage-loans");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Loan</h2>

      <form onSubmit={handleAddLoan} className="space-y-4">

        <input
          type="text"
          name="title"
          className="input input-bordered w-full"
          placeholder="Loan Title"
          required
        />

        <textarea
          name="shortDesc"
          className="textarea textarea-bordered w-full"
          placeholder="Loan Description"
          required
        ></textarea>

        <input
          type="text"
          name="category"
          className="input input-bordered w-full"
          placeholder="Category (e.g., Home, Business, Personal)"
          required
        />

        <input
          type="number"
          name="interest"
          className="input input-bordered w-full"
          placeholder="Interest Rate (%)"
          required
        />

        <input
          type="number"
          name="maxLimit"
          className="input input-bordered w-full"
          placeholder="Max Loan Limit"
          required
        />

        <input
          type="text"
          name="requiredDocs"
          className="input input-bordered w-full"
          placeholder="Required Documents "
          required
        />

        <input
          type="text"
          name="emiPlans"
          className="input input-bordered w-full"
          placeholder="EMI Plans (e.g., 3,6,12)"
          required
        />

        <input
          type="file"
          name="image"
          className="file-input file-input-bordered w-full"
          accept="image/*"
          required
        />

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="showOnHome" className="checkbox" />
          <span>Show on Home</span>
        </label>

        <button className="btn bg-green-500 text-white w-full" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Loan"}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
