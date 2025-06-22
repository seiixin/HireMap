import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

const UpdateApplication = ({ data: initialData, onClose }) => {
  const [data, setData] = useState({
    job_title: initialData.job_title || "",
    status: initialData.status || "",
    notes: initialData.notes || "",
    link: initialData.link || "",
  });

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    let errs = {};
    if (!data.job_title.trim()) errs.job_title = "Job title is required";
    if (!data.status.trim()) errs.status = "Status is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setProcessing(true);

    Inertia.put(
      `/applications/${initialData.id}`,
      data,
      {
        onSuccess: () => {
          setSuccessMessage("Application updated successfully!");
          setProcessing(false);
        },
        onError: (errs) => {
          setErrors(errs);
          setProcessing(false);
        },
      }
    );
  };

  useEffect(() => {
    setSuccessMessage("");
  }, [data]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow max-w-xl w-full relative"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
          Update Application
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
            {successMessage}
          </div>
        )}

        {/* Form-wide error */}
        {errors.form && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg text-center font-semibold">
            {errors.form}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">Job Title:</label>
          <input
            type="text"
            value={data.job_title}
            onChange={(e) => updateField("job_title", e.target.value)}
            placeholder="Enter job title"
            className={`w-full p-3 rounded-xl bg-blue-50 border ${
              errors.job_title ? "border-red-500" : "border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.job_title && (
            <p className="text-red-600 text-sm mt-1">{errors.job_title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">Status:</label>
          <select
            value={data.status}
            onChange={(e) => updateField("status", e.target.value)}
            className={`w-full p-3 rounded-xl bg-blue-50 border ${
              errors.status ? "border-red-500" : "border-transparent"
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="applied">Applied</option>
            <option value="replied">Replied</option>
            <option value="interview">Interview</option>
            <option value="final">Final</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          {errors.status && (
            <p className="text-red-600 text-sm mt-1">{errors.status}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">Notes:</label>
          <textarea
            value={data.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Optional notes"
            rows={3}
            className="w-full p-3 rounded-xl bg-blue-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-blue-600 text-sm mb-2">Link:</label>
          <input
            type="url"
            value={data.link}
            onChange={(e) => updateField("link", e.target.value)}
            placeholder="Optional link"
            className="w-full p-3 rounded-xl bg-blue-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full py-3 rounded-xl bg-blue-300 text-blue-900 font-semibold shadow hover:shadow-inner hover:text-blue-700 transition duration-200"
        >
          {processing ? "Updating..." : "Update Application"}
        </button>
      </form>
    </div>
  );
};

export default UpdateApplication;
