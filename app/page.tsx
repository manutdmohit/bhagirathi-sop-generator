'use client'; // Mark this as a Client Component

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    program: '',
    background: '',
    goals: '',
  });
  const [sop, setSop] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/generate-sop', formData);
      setSop(response.data.sop);
    } catch (error) {
      console.error('Error generating SOP:', error);
      alert('Failed to generate SOP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sop);
    alert('SOP copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([sop], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SOP.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Statement of Purpose Generator
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Program:
          </label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Background:
          </label>
          <textarea
            name="background"
            value={formData.background}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Goals:</label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {loading ? 'Generating...' : 'Generate SOP'}
        </button>
      </form>

      {sop && (
        <div className="bg-white shadow-lg rounded-2xl p-4 mt-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            Generated SOP:
          </h2>
          <p className="text-gray-700 whitespace-pre-line mb-4">{sop}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleCopy}
              className="bg-green-600 text-white py-2 px-4 rounded-xl font-bold hover:bg-green-700 transition"
            >
              Copy SOP
            </button>
            <button
              onClick={handleDownload}
              className="bg-purple-600 text-white py-2 px-4 rounded-xl font-bold hover:bg-purple-700 transition"
            >
              Download SOP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
