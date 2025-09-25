import axios from "axios";

// Change this if your backend runs on a different port
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Automatically add token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- Auth APIs ----------------
export const register = (userData) => API.post("/auth/register", userData);
export const login = (credentials) => API.post("/auth/login", credentials);

// ---------------- Alumni APIs ----------------
export const getAlumni = () => API.get("/alumni");
export const createAlumni = (data) => API.post("/alumni", data);

// ---------------- Event APIs ----------------
export const getEvents = () => API.get("/events");
export const createEvent = (data) => API.post("/events", data);

// ---------------- Job APIs ----------------
export const getJobs = () => API.get("/jobs");
export const createJob = (data) => API.post("/jobs", data);

// ---------------- Mentorship APIs ----------------
export const getMentorshipSuggestions = () => API.get("/mentorship/suggestions");

