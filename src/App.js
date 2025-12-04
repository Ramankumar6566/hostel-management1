 // src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import Mess from "./pages/Mess";
import Notices from "./pages/Notices";
import Fee from "./pages/Fee";
import Attendance from "./pages/Attendance";
import HostelDetails from "./pages/HostelDetails";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";

// Sidebar Component
function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Home", path: "/home" },
    { name: "Students", path: "/students" },
    { name: "Rooms", path: "/rooms" },
    { name: "Mess", path: "/mess" },
    { name: "Notices", path: "/notices" },
    { name: "Fee", path: "/fee" },
    { name: "Attendance", path: "/attendance" },
    { name: "Hostel Details", path: "/hostel-details" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="w-60 bg-indigo-700 text-white h-screen p-6 fixed">
      <h1 className="text-2xl font-bold mb-6">🏠 Hostel Admin</h1>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="hover:bg-indigo-500 px-3 py-2 rounded block"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-60 flex-1 bg-gray-100 min-h-screen p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/mess" element={<Mess />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/fee" element={<Fee />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/hostel-details" element={<HostelDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}
