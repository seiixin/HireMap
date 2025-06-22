import React, { useState } from 'react';
import { useForm, Link, Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Head title="Register" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-400 px-4 py-8">
        <div className="bg-[#e0e0e0] rounded-3xl shadow-neumorphic p-6 sm:p-8 md:p-10 w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Create Account</h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Join HireMap and manage your job applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div>
              <input
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none text-base"
                required
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 sm:py-4 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none text-base"
                required
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Password"
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
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <div className="relative">
              <input
                name="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 sm:py-4 pr-12 sm:pr-14 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none text-base"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none touch-manipulation"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
              {errors.password_confirmation && (
                <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>
              )}
            </div>

            {errors.registration && (
              <div className="text-red-500 text-sm text-center">{errors.registration}</div>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full py-3 sm:py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-neumorphic-inset hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 touch-manipulation text-base"
            >
              {processing ? 'Creating Account...' : 'Register'}
            </button>

            <div className="text-center mt-4 sm:mt-6">
              <Link
                href="/"
                className="text-purple-700 hover:underline text-sm sm:text-base touch-manipulation"
              >
                &larr; Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
