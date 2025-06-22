import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Sidebar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    Inertia.post('/logout');
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-trigger')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [isOpen]);

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Profile Settings',
      href: '/profile',
      icon: (
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-gray-800 text-white p-4 min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white overflow-hidden mb-2 flex items-center justify-center">
            <img
              src={user?.profile_picture || '/default-avatar.svg'}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <h2 className="text-xl font-semibold text-center">{user?.name}</h2>
        </div>
        <nav className="mt-6 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center py-2 px-3 rounded hover:bg-gray-700"
            >
              {item.icon}
              {item.name}
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-2 px-3 rounded hover:bg-red-600"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile Floating Menu */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="menu-trigger fixed top-4 left-4 z-50 w-12 h-12 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700"
        >
          <div className="relative w-6 h-6">
            <span
              className={`absolute block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                isOpen ? 'rotate-45 top-3' : 'top-1'
              }`}
            />
            <span
              className={`absolute block w-6 h-0.5 bg-white transform transition-all duration-300 top-3 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute block w-6 h-0.5 bg-white transform transition-all duration-300 ${
                isOpen ? '-rotate-45 top-3' : 'top-5'
              }`}
            />
          </div>
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Drawer */}
        <div
          className={`mobile-menu fixed top-0 left-0 h-full w-72 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 border-b border-gray-700">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white overflow-hidden mb-3">
                <img
                  src={user?.profile_picture || '/default-avatar.svg'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <h2 className="text-lg font-semibold">{user?.name}</h2>
              <p className="text-sm text-gray-300">{user?.email}</p>
            </div>
          </div>

          <nav className="p-6 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
            <button
              onClick={(e) => {
                handleLogout(e);
                setIsOpen(false);
              }}
              className="flex items-center w-full py-3 px-4 rounded-lg hover:bg-red-600 text-left"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
