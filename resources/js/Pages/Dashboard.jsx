import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

const Dashboard = ({ applications = [], stats = {} }) => {
  const { flash } = usePage().props;
  const [form, setForm] = useState({
    id: null,
    job_title: '',
    status: 'applied',
    notes: '',
    link: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      setForm({ id: null, job_title: '', status: 'applied', notes: '', link: '' });
      setIsEditing(false);
    }
  }, [flash]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && form.id) {
      Inertia.put(`/applications/${form.id}`, form);
    } else {
      Inertia.post('/applications', form);
    }
  };

  const handleEdit = (id) => {
    const app = applications.find((a) => a.id === id);
    if (app) {
      setForm({ ...app });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setForm({ id: null, job_title: '', status: 'applied', notes: '', link: '' });
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this application?')) {
      Inertia.delete(`/applications/${id}`);
    }
  };

  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'replied', label: 'Replied' },
    { value: 'interview', label: 'Interview' },
    { value: 'final', label: 'Final Round' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const getStatusBadgeColor = (status) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      replied: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      final: 'bg-orange-100 text-orange-800',
      offer: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Job Application Dashboard</h1>
      {flash?.success && <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{flash.success}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {[ 'applied', 'replied', 'interviews', 'final', 'offers' ].map((key, i) => (
          <div key={i} className={`aspect-square flex flex-col justify-center items-center rounded shadow bg-${key}-200 text-${key}-800`}>
            <div className="text-3xl md:text-4xl font-extrabold">{stats[key] || 0}</div>
            <div className="text-sm font-bold capitalize">{key}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input name="job_title" value={form.job_title} onChange={handleChange} placeholder="Job Title" className="border p-3 rounded-md" required />
            <select name="status" value={form.status} onChange={handleChange} className="border p-3 rounded-md">
              {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <input name="link" value={form.link} onChange={handleChange} placeholder="Job URL" className="border p-3 rounded-md" />
            <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="border p-3 rounded-md" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">{isEditing ? 'Update' : 'Add'} Application</button>
            {isEditing && <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-6 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map(app => (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{app.job_title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(app.status)}`}>
                    {statusOptions.find(s => s.value === app.status)?.label || app.status}
                  </span>
                </td>
                <td className="px-6 py-4 max-w-xs truncate">{app.notes || '-'}</td>
                <td className="px-6 py-4">
                  {app.link ? <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">View Job</a> : <span className="text-gray-400">-</span>}
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button onClick={() => handleEdit(app.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Edit</button>
                  <button onClick={() => handleDelete(app.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
