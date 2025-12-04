 import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Sona Hostel</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link to="/students" className="hover:bg-gray-700 p-2 rounded">Students</Link>
        <Link to="/rooms" className="hover:bg-gray-700 p-2 rounded">Rooms</Link>
        <Link to="/notices" className="hover:bg-gray-700 p-2 rounded">Notices</Link>
      </nav>
    </div>
  );
}
