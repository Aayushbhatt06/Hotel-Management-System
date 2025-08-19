import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      const errorMsg =
        data.error || data.message || "Invalid credentials, please try again.";
      alert(errorMsg);
      return;
    }

    // ✅ success case
    localStorage.setItem("token", data.jwtToken);
    console.log("Token stored:", localStorage.getItem("token"));
    navigate("/home");
  } catch (error) {
    console.error("Login failed:", error.message);
    alert("Something went wrong. Please try again later.");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 border border-orange-200">
        {/* 🍽️ Restaurant Logo / Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-red-500 to-orange-500 text-white text-2xl font-bold rounded-full shadow-md">
            🍴
          </div>
          <h3 className="text-3xl font-extrabold text-gray-800 mt-4">
            Restaurant Login
          </h3>
          <p className="text-gray-500 text-sm">
            Welcome back! Please login to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2.5 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-orange-600 font-medium hover:underline hover:text-red-500 transition"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
