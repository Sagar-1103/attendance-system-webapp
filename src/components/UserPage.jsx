import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserPage() {
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const firstName = params.userId.split(".")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyGZhLOCXzW1tZ5bOBVCM07q-I8BJeUCaDfQT59abVtOXZnLSIY5ylmFoqt-S6y8-ki/exec");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const userData = data; // Assuming the fetched data is an array of user objects.
        const tempUser = userData.filter(user => user["First Name"] === firstName);
        console.log(tempUser);
        setUsers(tempUser);
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

  const formatTime = (timestampString) => {
    const date = new Date(timestampString);
    const formattedTime = date.toLocaleTimeString("en-US", { hour12: true });
    return formattedTime;
  };

  const formatDate = (timestampString) => {
    const date = new Date(timestampString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
    return formattedDate;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="my-4">
        <h1 className="text-4xl font-semibold text-center my-20 text-gray-800">User Details</h1>
        {users.length>0 ? users.map((user)=>(
          <div className="mt-4 px-6 py-14 rounded-xl overflow-hidden bg-gradient-to-r from-blue-200 to-blue-300 shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
              <InfoField label="Student ID" value={user["Student ID"]} />
              <InfoField label="Name" value={`${user["First Name"]} ${user["Last Name"]}`} />
              <InfoField label="Gate No." value={user["Gate Number"]} />
              <InfoField label="In Time" value={formatTime(user["Time In"])} />
              <InfoField label="Out Time" value={user["Time Out "] ? formatTime(user["Time Out "]) : "-"} />
              <InfoField label="Date" value={formatDate(user["Date"])} />
              <InfoField label="Phone Number" value={user["Phone Number"]} />
              <InfoField label="Address" value={user["Address"]} />
              <InfoField label="Status" value={user["Time Out"] ? "Inside Campus" : "Outside Campus"} />
            </div>
          </div>
        )) : <div className="text-center text-xl text-gray-600">No user found.</div>}
      </div>
    </div>
  );
}

const InfoField = ({ label, value }) => (
  <div className="mb-4">
    <div className="text-black font-bold">{label}:</div>
    <div className="text-gray-500 font-medium">{value}</div>
  </div>
);

export default UserPage;
