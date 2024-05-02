import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Attendance() {
  const { data, error, isLoading } = useSWR(
    "https://script.googleusercontent.com/macros/echo?user_content_key=vaELJN0y7K2tal5T7ri8cKkGAKEZ6vHTtISdQI09K3jKBrV2SwylJTogK9x-Bw-qJSkc7811RA67aommuelWCR3inBsZDQ8tm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGHclP5A7edx32iQTpoloPHLyOl8aiKkmkdfp_OZ_dVfdo4dWkp6bioV-nL_st6B9C9LeOAUYfAz9bx9XJ5cohhLrw1jTwU0iw&lib=MiaXpAo03Ye5NVg9y9X1ZraofyZBkabnP",
    fetcher
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [showOutsideCampus, setShowOutsideCampus] = useState(false);

  if (error) return <div className="text-red-600">Failed to load data.</div>;
  if (isLoading) return <div className="text-gray-600">Loading...</div>;

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

  const filteredData = data.filter((user) => {
    const fullName = `${user["First Name"]} ${user["Last Name"]}`;
    const isInCampus = user["Time Out "] ? true : false;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (showOutsideCampus ? !isInCampus : true)
    );
  });

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Attendance List</h1>
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className={`py-2 px-4 rounded-md ${
              showOutsideCampus
                ? "bg-pink-400 text-white hover:bg-pink-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => setShowOutsideCampus(!showOutsideCampus)}
          >
            {showOutsideCampus ? "Show All" : "Show Outside Campus"}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-max divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Gate No.
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                In Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Out Time
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Phone Number
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Address
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((user) => (
              <tr key={user["Student ID"]} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">{user["Student ID"]}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user["First Name"]} {user["Last Name"]}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user["Gate Number"]}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatTime(user["Time In"])}</td>
                <td className="px-4 py-3 whitespace-nowrap">{user["Time Out "] ? formatTime(user["Time Out "]) : "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(user["Date"])}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <a href={`tel:+91${user["Phone Number"]}`}>{user["Phone Number"]}</a>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{user["Address"]}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user["Time Out "] ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {user["Time Out "] ? "Inside Campus" : "Outside Campus"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Button to navigate to the role decision page */}
      <div className="mt-4 text-center">
        <Link to="/">
          <button className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Attendance;
