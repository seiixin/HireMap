import React from 'react';
import { Inertia } from '@inertiajs/inertia';

const Sidebar = ({ user }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    Inertia.post('/logout');
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full mb-2 bg-white overflow-hidden flex items-center justify-center">
          <img
            src={user?.profile_picture || '/default-avatar.svg'}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
            }}
          />
        </div>
        <h2 className="text-xl font-semibold text-center">{user?.name}</h2>
      </div>
      <nav className="mt-6">
        <a href="/dashboard" className="block py-2 hover:bg-gray-700 rounded px-2">Dashboard</a>
        <a href="/profile" className="block py-2 hover:bg-gray-700 rounded px-2">Profile Settings</a>
        <button
          onClick={handleLogout}
          className="w-full text-left py-2 hover:bg-gray-700 rounded px-2"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
