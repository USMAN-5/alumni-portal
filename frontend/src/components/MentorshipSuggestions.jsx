import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorshipSuggestions = () => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/mentorship/suggestions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuggestions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching suggestions');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) return <div className="p-4">Loading mentorship suggestions...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!suggestions) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome, {suggestions.student.name}!</h2>
        <p className="text-gray-600">Roll Number: {suggestions.student.rollNumber}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Recommended Alumni Mentors</h3>
        <p className="text-gray-600 mb-4">
          Based on your profile, we've found some alumni who might be great mentors for you:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {suggestions.suggestedMentors.map((mentor) => (
          <div 
            key={mentor._id} 
            className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }}
          >
            <h4 className="text-xl font-bold mb-3 text-[#B95E82]">{mentor.name}</h4>
            <div className="space-y-2 mb-4">
              <p className="text-gray-700 flex items-center">
                <span className="font-medium text-[#F39F9F]">Batch:</span>
                <span className="ml-2">{mentor.batch}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-[#F39F9F]">{mentor.position}</span>
              </p>
              <p className="text-gray-700 font-medium">{mentor.company}</p>
            </div>
            <div className="mb-4 bg-[#FFC29B]/20 rounded-lg p-2">
              <p className="text-sm font-medium text-[#B95E82]">
                Match Score: {Math.round(mentor.matchScore)}%
              </p>
            </div>
            <button 
              onClick={() => window.location.href = `mailto:${mentor.email}`}
              className="w-full bg-gradient-to-r from-[#B95E82] to-[#F39F9F] text-white px-4 py-3 rounded-lg font-semibold hover:from-[#a54971] hover:to-[#e58e8e] transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Connect with {mentor.name.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Why Connect with Alumni?</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Get valuable career guidance and industry insights</li>
          <li>Learn from their experiences and journey</li>
          <li>Build professional networks in your field of interest</li>
          <li>Get advice on career paths and opportunities</li>
        </ul>
      </div>
    </div>
  );
};

export default MentorshipSuggestions;