import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import fetchWithAuthorization from "../../api/fetch-with-authorization";
import { END_POINTS } from "../../api/end-points";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: (userData) =>
      fetchWithAuthorization({
        path: END_POINTS.AUTH.SIGN_UP,
        method: "POST",
        body: userData,
      }),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Sign up error:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({ name, email, password, role });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-300"
            >
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
