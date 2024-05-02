import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function UserLogin() {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const { data: userData, error, isLoading } = useSWR(
    "https://script.google.com/macros/s/AKfycbyGZhLOCXzW1tZ5bOBVCM07q-I8BJeUCaDfQT59abVtOXZnLSIY5ylmFoqt-S6y8-ki/exec",
    fetcher
  );

  const handleLogin = async(event) => {
    event.preventDefault();
    if (!studentId || !firstName) {
      alert("Please enter both Student ID and First Name.");
      return;
    }

    // Find user by first name and student ID
    const user = await userData.find((user) => user["First Name"].toLowerCase() === firstName.toLowerCase());

    if (user) {
      // Navigate to user page with user data
      navigate(`/user/${user["Student ID"]}.${user["First Name"]}`);
    } else {
      alert("User not found. Please check your Student ID and First Name.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserLogin;
