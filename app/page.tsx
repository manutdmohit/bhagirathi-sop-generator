'use client'; // Mark this as a Client Component

import { useState } from 'react';
import axios from 'axios';

interface FormData {
  name: string;
  program: string;
  background: string;
  goals: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    program: '',
    background: '',
    goals: '',
  });
  const [sop, setSop] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    alert('SOP copied to clipboard');
  };

  const handleDownload = () => {
    const blob = new Blob([sop], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Statement_of_Purpose.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">
        Statement of Purpose Generator
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Program:
          </label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Background:
          </label>
          <textarea
            name="background"
            value={formData.background}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Goals:
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate SOP'}
        </button>
      </form>

      {sop && (
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Generated SOP:</h2>
          <p className="whitespace-pre-wrap text-gray-700">{sop}</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCopy}
              className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              Copy SOP
            </button>
            <button
              onClick={handleDownload}
              className="py-2 px-4 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
            >
              Download SOP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
