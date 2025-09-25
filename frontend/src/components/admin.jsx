import React from "react";
import AlumniForm from "./AlumniForm";

function Admin() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Admin Dashboard</h1>
      <p className="mt-2 mb-6">You are logged in ✅</p>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Add New Alumni</h2>
        <AlumniForm />
      </div>
    </div>
  );
}

export default Admin;
