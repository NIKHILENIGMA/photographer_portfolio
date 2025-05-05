import { JSX } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignupPage(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#0d0d0d] text-white p-8 rounded-lg shadow-lg w-full max-w-sm border border-gray-800">
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-gray-400 text-sm mb-6">
          Enter your email below to create your account
        </p>

        <div className="flex gap-4 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-md hover:bg-gray-800 transition">
            <FaGithub className="text-lg" />
            GitHub
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-md hover:bg-gray-800 transition">
            <FaGoogle className="text-lg" />
            Google
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <hr className="flex-grow border-gray-700" />
          <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="m@example.com"
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 rounded-md transition"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
