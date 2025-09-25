import React, { useState } from "react";
import { login } from "../api";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const formStyle = {
    background: 'linear-gradient(135deg, #FFC29B 0%, #F39F9F 100%)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send email + password as object
      const res = await login({ email, password });
      console.log("Login response:", res.data); // check what backend sends

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        onLogin(); // notify parent
      } else {
        alert("No token received from server!");
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err);
      alert("Login failed");
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-white/70">Sign in to your account to continue</p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="space-y-6">
          <div className="group">
            <label className="block text-white/90 text-sm font-medium mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="group">
            <label className="block text-white/90 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#FFD700]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30 transition-all duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/10 text-[#FFD700] focus:ring-[#FFD700]/30"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-[#FFD700] hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>
          <button 
            type="submit" 
            className="w-full py-3 px-4 rounded-lg bg-[#FFD700] text-[#1A237E] font-semibold hover:bg-white transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
