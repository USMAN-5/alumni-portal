import React from 'react';
import { Link } from 'react-router-dom'; // <-- IMPORTANT: Import Link

const JobBoard = () => {
    // ... logic for fetching jobs ...

    return (
        <div className="p-10 bg-gray-900 min-h-screen text-white">
            <h1 className="text-5xl font-bold mb-8">Job Board</h1>
            
            <div className="flex space-x-4">
                {/* 1. Login Button */}
                <Link 
                    to="/login" // <-- Links to the /login path defined in App.jsx
                    className="bg-white text-gray-900 hover:bg-gray-200 font-semibold py-2 px-4 rounded transition duration-150"
                >
                    Login
                </Link>

                {/* 2. Add Job Button */}
                <Link 
                    to="/add-job" // <-- Links to the /add-job path
                    className="bg-indigo-600 text-white hover:bg-indigo-700 font-semibold py-2 px-4 rounded transition duration-150"
                >
                    Add Job
                </Link>
            </div>
            
            {/* ... rest of the job board content ... */}
        </div>
    );
};

export default JobBoard;