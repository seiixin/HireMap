import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import AddApplication from "@/Components/AddApplication";
import UpdateApplication from "@/Components/UpdateApplication";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";

const Dashboard = ({ applications = [], stats = {} }) => {
  const { flash } = usePage().props;

  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this application?")) {
      Inertia.delete(`/applications/${id}`);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      applied: "bg-blue-100 text-blue-800",
      replied: "bg-yellow-100 text-yellow-800",
      interview: "bg-purple-100 text-purple-800",
      final: "bg-orange-100 text-orange-800",
      offer: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <UserLayout>
      <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Job Application Dashboard
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-700 font-medium text-center"
          >
            + Add Application
          </button>
        </div>

        {flash?.success && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            {flash.success}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {["applied", "replied", "interview", "final", "offer"].map((key) => (
            <div
              key={key}
              className={`p-4 flex flex-col justify-center items-center rounded-lg shadow-sm ${getStatusBadgeColor(
                key
              )}`}
            >
              <div className="text-2xl sm:text-3xl font-extrabold mb-1">{stats[key] || 0}</div>
              <div className="text-xs sm:text-sm font-bold capitalize text-center">{key}</div>
            </div>
          ))}
        </div>

        {/* Mobile card view */}
        <div className="bg-white rounded-lg shadow sm:hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="text-sm font-medium text-gray-900">Applications ({applications.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {applications.map((app) => (
              <div key={app.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-medium text-gray-900 pr-2 flex-1">{app.job_title}</h4>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>

                {app.notes && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {app.notes}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div>
                    {app.link ? (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Job →
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No link</span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditData(app)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No applications yet</p>
                <p className="text-xs mt-1">Add your first application to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{app.job_title}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    <div className="max-w-xs truncate">{app.notes || "-"}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {app.link ? (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm space-x-2">
                    <button
                      onClick={() => setEditData(app)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">No applications yet</p>
                    <p className="text-xs mt-1">Add your first application to get started</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddApplication onClose={() => setShowAddModal(false)} />}
      {editData && <UpdateApplication data={editData} onClose={() => setEditData(null)} />}
    </UserLayout>
  );
};

export default Dashboard;
