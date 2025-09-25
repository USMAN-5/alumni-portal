import React, { useState } from "react";
import { register } from "../api";

function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    rollNumber: ""
  });

  const formStyle = {
    background: 'linear-gradient(135deg, #F39F9F 0%, #FFC29B 100%)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful! Please login.");
      if (onRegister) onRegister();
    } catch (err) {
      console.error("Registration error:", err.response ? err.response.data : err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // Check if roll number is required
  const isRollNumberRequired = formData.role === "student" || formData.role === "alumni";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <form onSubmit={handleSubmit} style={formStyle} className="p-8 w-96 max-w-full">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Create Account</h2>
        
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student" className="text-gray-800">Student</option>
            <option value="alumni" className="text-gray-800">Alumni</option>
            <option value="admin" className="text-gray-800">Admin</option>
          </select>

          {isRollNumberRequired && (
            <input
              type="text"
              name="rollNumber"
              placeholder="Roll Number"
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          )}

          <button 
            type="submit" 
            className="w-full py-3 rounded-lg bg-[#B95E82] text-white font-semibold hover:bg-[#a54971] transform hover:scale-105 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;