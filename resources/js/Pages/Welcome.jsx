import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Welcome() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-400">
      <div className="bg-[#e0e0e0] rounded-3xl shadow-neumorphic p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">HireMap</h1>
          <p className="mt-2 text-gray-600 text-sm">
            Track your job applications from start to success.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
              required
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Show authentication error */}
          {errors.message && (
            <p className="text-red-600 text-sm mt-2 text-center">{errors.message}</p>
          )}

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-neumorphic-inset hover:scale-105 transition-transform disabled:opacity-50"
          >
            {processing ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-right text-sm mt-1">
            <Link href="/forgot-password" className="text-purple-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Link
            href="/register"
            className="block w-full text-center mt-4 py-3 rounded-xl font-semibold text-purple-700 bg-white shadow hover:bg-gray-100 transition"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
