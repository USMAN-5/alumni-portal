import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import JobBoard from './JobBoard';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // must pass as object { email, password }
      const res = await login({ email, password });
      console.log("Login response:", res.data); // debug output

      // backend should return { token: "..." }
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
        onLogin();
      } else {
        alert("No token received from server!");
      }
    } catch (err) {
      console.error(
        "Login error:",
        err.response ? err.response.data : err.message
      );
      alert("Login failed");
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#1A237E] via-[#3949AB] to-[#1A237E]">
        <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center space-x-4">
                <svg className="w-10 h-10 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 3.721 1.596a1 1 0 00.788 0l7-3a1 1 0 000-1.84l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18h8a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17h-6v-3.777a8.935 8.935 0 00-2 .712V17a1 1 0 001 1z"/>
                </svg>
                <h1 className="text-3xl font-bold text-white tracking-wider flex items-center">
                  Alumni
                  <span className="text-[#FFD700] ml-2">Connect</span>
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <button className="text-white hover:text-[#FFD700] transition-colors">
                      Dashboard
                    </button>
                    <button className="text-white hover:text-[#FFD700] transition-colors">
                      Events
                    </button>
                    <button className="text-white hover:text-[#FFD700] transition-colors">
                      Jobs
                    </button>
                    <button
                      onClick={handleLogout}
                      className="ml-4 px-6 py-2.5 bg-[#FFD700] text-[#1A237E] rounded-lg font-semibold hover:bg-white transform hover:scale-105 transition-all duration-200 shadow-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button className="text-white hover:text-[#FFD700] transition-colors">
                      About
                    </button>
                    <button className="text-white hover:text-[#FFD700] transition-colors">
                      Contact
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" />
              ) : (
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-md mx-auto">
                    <div className="flex flex-col items-center space-y-8">
                      <div className="w-full max-w-md backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-xl">
                        <h1 className="text-4xl font-bold text-white text-center mb-8">Welcome Back</h1>
                        <LoginForm onLogin={handleLogin} />
                        <div className="mt-6 text-center">
                          <p className="text-white/90 mb-4">Don't have an account?</p>
                          <RegisterForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/jobs"
            element={isLoggedIn ? <JobBoard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
