import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

export default function Welcome() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-400 px-4 py-8">
      <div className="bg-[#e0e0e0] rounded-3xl shadow-neumorphic p-6 sm:p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">HireMap</h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Track your job applications from start to success.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="w-full px-4 py-3 sm:py-4 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none text-base"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              className="w-full px-4 py-3 sm:py-4 pr-12 sm:pr-14 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none text-base"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none touch-manipulation"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
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
            className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-neumorphic-inset hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 touch-manipulation text-base"
          >
            {processing ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-right text-sm mt-1">
            <Link href="/forgot-password" className="text-purple-700 hover:underline touch-manipulation">
              Forgot password?
            </Link>
          </div>

          <Link
            href="/register"
            className="block w-full text-center mt-4 py-3 sm:py-4 rounded-xl font-semibold text-purple-700 bg-white shadow hover:bg-gray-100 active:bg-gray-200 transition touch-manipulation text-base"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
