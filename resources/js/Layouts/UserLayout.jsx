import React from 'react';
import Sidebar from '@/Components/Sidebar';
import { usePage } from '@inertiajs/react';

const UserLayout = ({ children }) => {
  const { auth } = usePage().props;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={auth.user} />
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
