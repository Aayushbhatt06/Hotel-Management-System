import React, { useState, useContext } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signupContext } from "../../context/context";

const Signup = () => {
  const { signup, setSignup } = useContext(signupContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!signup.name || !signup.email || !signup.password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (signup.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    navigate("/signup/setup");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400">
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-96 border border-orange-200">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-red-500 to-orange-500 text-white text-2xl font-bold rounded-full shadow-md">
            🍽️
          </div>
          <h3 className="text-3xl font-extrabold text-gray-800 mt-4">
            Create Account
          </h3>
          <p className="text-gray-500 text-sm">Sign up to manage your restaurant.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={signup.name}
                onChange={handleOnChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={signup.email}
                onChange={handleOnChange}
                required
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={signup.password}
                onChange={handleOnChange}
                required
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showConfirm ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2.5 rounded-lg font-semibold shadow-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
