import React from "react";
import { Link } from "react-router-dom";

function RoleSelection() {
  const handleRoleSelect = (role) => {
    // You might want to route the user or store the role somewhere
    console.log(`Selected role: ${role}`);
    // e.g., redirect to /admin if Admin and /user if User
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto shadow-md hover:shadow-lg rounded-lg">
        <h2 className="mb-4 text-4xl text-center font-bold">Select Your Role</h2>
        <hr />
        <div className="pt-8">
          <Link to={"/adminlogin"}>
            <button className="w-full mb-4 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors">
              Admin
            </button>
          </Link>
          <button
            onClick={() => handleRoleSelect("User")}
            className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition-colors"
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
