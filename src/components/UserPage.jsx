import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const firstName = params.userId.split(".")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=vaELJN0y7K2tal5T7ri8cKkGAKEZ6vHTtISdQI09K3jKBrV2SwylJTogK9x-Bw-qJSkc7811RA67aommuelWCR3inBsZDQ8tm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGHclP5A7edx32iQTpoloPHLyOl8aiKkmkdfp_OZ_dVfdo4dWkp6bioV-nL_st6B9C9LeOAUYfAz9bx9XJ5cohhLrw1jTwU0iw&lib=MiaXpAo03Ye5NVg9y9X1ZraofyZBkabnP");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userData = data; // Assuming the fetched data is an array of user objects.
        const tempUser = userData.find(user => user["First Name"] === firstName);
        setUser(tempUser);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.userId]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen text-2xl text-gray-700 animate-pulse">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-2xl text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
    <div className="my-4">
      <h1 className="text-4xl font-semibold text-center text-gray-800">User Details</h1>
      {user ? (
        <div className="mt-4 p-6 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
             style={{ background: 'linear-gradient(45deg, #667eea, #764ba2)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
            <InfoField label="Student ID" value={user["Student ID"]} />
            <InfoField label="Name" value={`${user["First Name"]} ${user["Last Name"]}`} />
            <InfoField label="Gate No." value={user["Gate Number"]} />
            <InfoField label="In Time" value={user["Time In"]} />
            <InfoField label="Out Time" value={user["Time Out"]} />
            <InfoField label="Date" value={user["Date"]} />
            <InfoField label="Phone Number" value={user["Phone Number"]} />
            <InfoField label="Address" value={user["Address"]} />
            <InfoField label="Status" value={user["Time Out"] ? "Inside Campus" : "Outside Campus"} />
          </div>
        </div>
      ) : <div className="text-center text-xl text-gray-600">No user found.</div>}
    </div>
  </div>
);
}

const InfoField = ({ label, value }) => (
  <div className="mb-4">
    <div className="text-white-600 font-medium">{label}:</div>
    <div className="text-gray-900">{value}</div>
  </div>
);

export default UserPage;
