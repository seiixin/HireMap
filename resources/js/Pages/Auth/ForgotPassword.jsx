import React, { useState } from 'react';
import { Link } from '@inertiajs/react';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/forgot-password', { email }, {
      onSuccess: (page) => {
        setStatus(page.props.status || 'Reset link sent if the email exists.');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-400">
      <div className="bg-[#e0e0e0] rounded-3xl shadow-neumorphic p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Forgot Password</h1>
        {status && <p className="text-green-600 text-sm mb-4 text-center">{status}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-neumorphic-inset hover:scale-105 transition-transform"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-purple-700 hover:underline text-sm"
          >
            &larr; Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
