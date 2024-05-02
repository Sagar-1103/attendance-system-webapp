import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function UserLogin() {
  const [studentId, setStudentId] = useState('');
  const [firstName, setFirstName] = useState('');
  const navigate = useNavigate();

  const { data: userData, error, isLoading } = useSWR(
    "https://script.googleusercontent.com/macros/echo?user_content_key=vaELJN0y7K2tal5T7ri8cKkGAKEZ6vHTtISdQI09K3jKBrV2SwylJTogK9x-Bw-qJSkc7811RA67aommuelWCR3inBsZDQ8tm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGHclP5A7edx32iQTpoloPHLyOl8aiKkmkdfp_OZ_dVfdo4dWkp6bioV-nL_st6B9C9LeOAUYfAz9bx9XJ5cohhLrw1jTwU0iw&lib=MiaXpAo03Ye5NVg9y9X1ZraofyZBkabnP",
    fetcher
  );

  const handleLogin = (event) => {
    event.preventDefault();
    if (!studentId || !firstName) {
      alert("Please enter both Student ID and First Name.");
      return;
    }

    // Find user by first name and student ID
    const user = userData.find((user) => user["First Name"].toLowerCase() === firstName.toLowerCase());

    if (user) {
      // Navigate to user page with user data
      navigate("/userpage", { state: { user } });
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
