import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Load user data from localStorage
    const storedData = localStorage.getItem("user");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold">Welcome back, {userData?.name}!</h1>
        <p className="mt-2 text-blue-100">
          Here’s your personalized alumni dashboard. Stay connected, explore
          opportunities, and engage with the alumni community.
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Academic Resources</h3>
          <p className="mt-2 text-gray-500">
            Access study materials, notes, and resources shared by alumni.
          </p>
          <Link
            to="/resources"
            className="text-blue-600 font-medium mt-3 inline-block"
          >
            Explore →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Alumni Network</h3>
          <p className="mt-2 text-gray-500">
            Connect with seniors and alumni for guidance and mentorship.
          </p>
          <Link
            to="/alumni"
            className="text-blue-600 font-medium mt-3 inline-block"
          >
            Connect →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <h3 className="text-lg font-semibold">Career Opportunities</h3>
          <p className="mt-2 text-gray-500">
            Stay updated with internships, placements, and job openings.
          </p>
          <Link
            to="/careers"
            className="text-blue-600 font-medium mt-3 inline-block"
          >
            View Jobs →
          </Link>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">Name</p>
            <p className="text-lg font-medium">{userData?.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">Email</p>
            <p className="text-lg font-medium">{userData?.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">Program</p>
            <p className="text-lg font-medium">
              {userData?.program || "B.Tech CSE"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-1">Year</p>
            <p className="text-lg font-medium">
              {userData?.year || "3rd Year"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
