'use client';

import { useState } from 'react';
import axios from 'axios';

interface FormData {
  studentName: string;
  city: string;'use client';

import { useState } from 'react';
import axios from 'axios';

interface FormData {
  studentName: string;
  city: string;
  wardNumber: string;
  province: string;
  educationLevel: string;
  major: string;
  subjects: string;
  institutionName: string;
  institutionAddress: string;
  enrollmentDate: string;
  jlctExamDate: string;
  languageSchoolName: string;
  enrollmentMonthYear: string;
  languageProgramDuration: string;
  subjectsToLearn: string;
  universityFaculty: string;
  universityMajor: string;
  focusAreas: string;
  futureGoals: string;
  contribution: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    city: '',
    wardNumber: '',
    province: '',
    educationLevel: '',
    major: '',
    subjects: '',
    institutionName: '',
    institutionAddress: '',
    enrollmentDate: '',
    jlctExamDate: '',
    languageSchoolName: '',
    enrollmentMonthYear: '',
    languageProgramDuration: '',
    subjectsToLearn: '',
    universityFaculty: '',
    universityMajor: '',
    focusAreas: '',
    futureGoals: '',
    contribution: '',
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
    a.download = 'Statement_of_Purpose.doc';
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
            Student Name:
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Enter your city"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ward Number:
          </label>
          <input
            type="text"
            name="wardNumber"
            value={formData.wardNumber}
            onChange={handleChange}
            required
            placeholder="Enter your ward number"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Province:
          </label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            placeholder="Enter your province"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Education Level:
          </label>
          <input
            type="text"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
            placeholder="Enter your education level (e.g., Bachelor's)"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Major:
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            placeholder="Enter your major (e.g., Computer Science)"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subjects:
          </label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
            placeholder="Enter the subjects you studied"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Name:
          </label>
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            required
            placeholder="Enter the name of the institution"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Address:
          </label>
          <input
            type="text"
            name="institutionAddress"
            value={formData.institutionAddress}
            onChange={handleChange}
            required
            placeholder="Enter the institution address"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment Date:
          </label>
          <input
            type="text"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
            placeholder="Enter your enrollment date"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            JLCT Exam Date:
          </label>
          <input
            type="text"
            name="jlctExamDate"
            value={formData.jlctExamDate}
            onChange={handleChange}
            required
            placeholder="Enter your JLCT exam date"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language School Name:
          </label>
          <input
            type="text"
            name="languageSchoolName"
            value={formData.languageSchoolName}
            onChange={handleChange}
            required
            placeholder="Enter the name of your language school"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment Month/Year:
          </label>
          <input
            type="text"
            name="enrollmentMonthYear"
            value={formData.enrollmentMonthYear}
            onChange={handleChange}
            required
            placeholder="Enter your enrollment month and year"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language Program Duration:
          </label>
          <input
            type="text"
            name="languageProgramDuration"
            value={formData.languageProgramDuration}
            onChange={handleChange}
            required
            placeholder="Enter language program duration"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subjects to Learn:
          </label>
          <input
            type="text"
            name="subjectsToLearn"
            value={formData.subjectsToLearn}
            onChange={handleChange}
            required
            placeholder="Enter subjects you want to learn"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            University Faculty:
          </label>
          <input
            type="text"
            name="universityFaculty"
            value={formData.universityFaculty}
            onChange={handleChange}
            required
            placeholder="Enter the faculty you want to join"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            University Major:
          </label>
          <input
            type="text"
            name="universityMajor"
            value={formData.universityMajor}
            onChange={handleChange}
            required
            placeholder="Enter the major you wish to pursue"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Focus Areas:
          </label>
          <input
            type="text"
            name="focusAreas"
            value={formData.focusAreas}
            onChange={handleChange}
            required
            placeholder="Enter your focus areas in the program"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Future Goals:
          </label>
          <input
            type="text"
            name="futureGoals"
            value={formData.futureGoals}
            onChange={handleChange}
            required
            placeholder="Enter your future career goals"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contribution to Society:
          </label>
          <input
            type="text"
            name="contribution"
            value={formData.contribution}
            onChange={handleChange}
            required
            placeholder="Enter your contribution to society goals"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md w-full disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate SOP'}
          </button>
        </div>
      </form>

      {sop && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">Generated SOP:</h2>
          <textarea
            value={sop}
            readOnly
            rows={10}
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Copy SOP
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Download SOP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

  wardNumber: string;
  province: string;
  educationLevel: string;
  major: string;
  subjects: string;
  institutionName: string;
  institutionAddress: string;
  enrollmentDate: string;
  jlctExamDate: string;
  languageSchoolName: string;
  enrollmentMonthYear: string;
  languageProgramDuration: string;
  subjectsToLearn: string;
  universityFaculty: string;
  universityMajor: string;
  focusAreas: string;
  futureGoals: string;
  contribution: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    studentName: '',
    city: '',
    wardNumber: '',
    province: '',
    educationLevel: '',
    major: '',
    subjects: '',
    institutionName: '',
    institutionAddress: '',
    enrollmentDate: '',
    jlctExamDate: '',
    languageSchoolName: '',
    enrollmentMonthYear: '',
    languageProgramDuration: '',
    subjectsToLearn: '',
    universityFaculty: '',
    universityMajor: '',
    focusAreas: '',
    futureGoals: '',
    contribution: '',
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
    a.download = 'Statement_of_Purpose.doc';
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
            Student Name:
          </label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            placeholder="Enter your city"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ward Number:
          </label>
          <input
            type="text"
            name="wardNumber"
            value={formData.wardNumber}
            onChange={handleChange}
            required
            placeholder="Enter your ward number"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Province:
          </label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            required
            placeholder="Enter your province"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Education Level:
          </label>
          <input
            type="text"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
            placeholder="Enter your education level (e.g., Bachelor's)"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Major:
          </label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
            placeholder="Enter your major (e.g., Computer Science)"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subjects:
          </label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            required
            placeholder="Enter the subjects you studied"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Name:
          </label>
          <input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            required
            placeholder="Enter the name of the institution"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Institution Address:
          </label>
          <input
            type="text"
            name="institutionAddress"
            value={formData.institutionAddress}
            onChange={handleChange}
            required
            placeholder="Enter the institution address"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment Date:
          </label>
          <input
            type="text"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
            placeholder="Enter your enrollment date"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            JLCT Exam Date:
          </label>
          <input
            type="text"
            name="jlctExamDate"
            value={formData.jlctExamDate}
            onChange={handleChange}
            required
            placeholder="Enter your JLCT exam date"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language School Name:
          </label>
          <input
            type="text"
            name="languageSchoolName"
            value={formData.languageSchoolName}
            onChange={handleChange}
            required
            placeholder="Enter the name of your language school"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Enrollment Month/Year:
          </label>
          <input
            type="text"
            name="enrollmentMonthYear"
            value={formData.enrollmentMonthYear}
            onChange={handleChange}
            required
            placeholder="Enter your enrollment month and year"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language Program Duration:
          </label>
          <input
            type="text"
            name="languageProgramDuration"
            value={formData.languageProgramDuration}
            onChange={handleChange}
            required
            placeholder="Enter language program duration"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subjects to Learn:
          </label>
          <input
            type="text"
            name="subjectsToLearn"
            value={formData.subjectsToLearn}
            onChange={handleChange}
            required
            placeholder="Enter subjects you want to learn"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            University Faculty:
          </label>
          <input
            type="text"
            name="universityFaculty"
            value={formData.universityFaculty}
            onChange={handleChange}
            required
            placeholder="Enter the faculty you want to join"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            University Major:
          </label>
          <input
            type="text"
            name="universityMajor"
            value={formData.universityMajor}
            onChange={handleChange}
            required
            placeholder="Enter the major you wish to pursue"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Focus Areas:
          </label>
          <input
            type="text"
            name="focusAreas"
            value={formData.focusAreas}
            onChange={handleChange}
            required
            placeholder="Enter your focus areas in the program"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Future Goals:
          </label>
          <input
            type="text"
            name="futureGoals"
            value={formData.futureGoals}
            onChange={handleChange}
            required
            placeholder="Enter your future career goals"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contribution to Society:
          </label>
          <input
            type="text"
            name="contribution"
            value={formData.contribution}
            onChange={handleChange}
            required
            placeholder="Enter your contribution to society goals"
            className="p-1 mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md w-full disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate SOP'}
          </button>
        </div>
      </form>

      {sop && (
        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-bold">Generated SOP:</h2>
          <textarea
            value={sop}
            readOnly
            rows={10}
            className="w-full p-2 border rounded-lg"
          />
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Copy SOP
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Download SOP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
