import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF5FF] px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#1D267D] mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1D267D]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#1D267D]"
          />
          <button
            type="submit"
            className="w-full bg-[#1D267D] text-white py-3 rounded-md hover:bg-[#0C134F] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
