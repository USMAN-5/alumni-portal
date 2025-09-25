import React, { useState } from "react";
import { createJob } from "../api";

function JobForm() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createJob({ title, company });
      alert("Job added: " + res.data.title);
      setTitle("");
      setCompany("");
    } catch (err) {
      console.error(err);
      alert("Failed to add job");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 mt-4">
      <h2 className="text-lg font-bold mb-2">Add Job</h2>
      <input
        type="text"
        placeholder="Job Title"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company"
        className="border p-2 w-full mb-2"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Add Job
      </button>
    </form>
  );
}

export default JobForm;
