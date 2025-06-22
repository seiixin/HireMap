import React from 'react';
import { useForm, Link, Head } from '@inertiajs/react';

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <>
      <Head title="Register" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-cyan-400">
        <div className="bg-[#e0e0e0] rounded-3xl shadow-neumorphic p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800">Create Account</h1>
            <p className="mt-2 text-gray-600 text-sm">
              Join HireMap and manage your job applications.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
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
                className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
                required
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <input
                name="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
                required
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <div>
              <input
                name="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-xl bg-[#e0e0e0] shadow-inner-neumorphic text-gray-700 focus:outline-none"
                required
              />
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
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-500 shadow-neumorphic-inset hover:scale-105 transition-transform disabled:opacity-50"
            >
              {processing ? 'Creating Account...' : 'Register'}
            </button>

            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-purple-700 hover:underline text-sm"
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
