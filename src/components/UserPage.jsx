import React from 'react';

function UserPage({ user }) {
  return (
    <div className="container mx-auto">
      <div className="my-4">
        <h1 className="text-3xl font-semibold text-gray-800">User Details</h1>
        {/* <div className="mt-4 p-4 bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-2 gap-x-4">
            <div className="text-gray-600">Student ID:</div>
            <div className="text-gray-900">{user["Student ID"]}</div>
            <div className="text-gray-600">Name:</div>
            <div className="text-gray-900">{user["First Name"]} {user["Last Name"]}</div>
            <div className="text-gray-600">Gate No.:</div>
            <div className="text-gray-900">{user["Gate Number"]}</div>
            <div className="text-gray-600">In Time:</div>
            <div className="text-gray-900">{user["Time In"]}</div>
            <div className="text-gray-600">Out Time:</div>
            <div className="text-gray-900">{user["Time Out "]}</div>
            <div className="text-gray-600">Date:</div>
            <div className="text-gray-900">{user["Date"]}</div>
            <div className="text-gray-600">Phone Number:</div>
            <div className="text-gray-900">{user["Phone Number"]}</div>
            <div className="text-gray-600">Address:</div>
            <div className="text-gray-900">{user["Address"]}</div>
            <div className="text-gray-600">Status:</div>
            <div className="text-gray-900">{user["Time Out "] ? "Inside Campus" : "Outside Campus"}</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default UserPage;
