import React from "react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  isActive
    ? "block py-2 px-3 rounded bg-blue-100"
    : "block py-2 px-3 rounded hover:bg-gray-100";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-4 border-r">
      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          Students
        </NavLink>
        <NavLink to="/rooms" className={linkClass}>
          Rooms
        </NavLink>
        <NavLink to="/mess" className={linkClass}>
          Mess
        </NavLink>
        <NavLink to="/fees" className={linkClass}>
          Fees
        </NavLink>
        <NavLink to="/attendance" className={linkClass}>
          Attendance
        </NavLink>
        <NavLink to="/notices" className={linkClass}>
          Notices
        </NavLink>
        <NavLink to="/gallery" className={linkClass}>
          Gallery
        </NavLink>
        <NavLink to="/complaints" className={linkClass}>
          Complaints
        </NavLink>
        <NavLink to="/hostel-details" className={linkClass}>
          Hostel Details
        </NavLink>
      </nav>
    </aside>
  );
}
// src/components/Sidebar.jsx

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🏨 Hostel Manager
      </h2>

      <div className="flex flex-col gap-3">

        <Link to="/dashboard" className="menu-item">
          🏠 Dashboard
        </Link>

        <Link to="/students" className="menu-item">
          👨‍🎓 Students
        </Link>

        <Link to="/rooms" className="menu-item">
          🚪 Rooms
        </Link>

        <Link to="/mess" className="menu-item">
          🍽️ Mess Menu
        </Link>

        <Link to="/fee" className="menu-item">
          💰 Fee Details
        </Link>

        <Link to="/notices" className="menu-item">
          📢 Notices
        </Link>

        {/* ⭐ NEW OPTION — ROOM ALLOCATION */}
        <Link to="/allocate-room" className="menu-item">
          🛏️ Allocate Room
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;
