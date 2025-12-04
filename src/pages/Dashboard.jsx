import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([
    { number: "101", type: "Single", status: "Available" },
    { number: "102", type: "Double", status: "Occupied" },
    { number: "103", type: "Single", status: "Occupied" },
    { number: "104", type: "Double", status: "Available" },
  ]);
  const [attendance, setAttendance] = useState([]);
  const [notices, setNotices] = useState([
    { id: 1, title: "Maintenance Notice", date: "2025-12-01" },
    { id: 2, title: "Mess Timing Update", date: "2025-12-02" },
  ]);

  // Load students and attendance from localStorage
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const savedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || [];
    setStudents(savedStudents);
    setAttendance(savedAttendance);
  }, []);

  // Count stats
  const totalStudents = students.length;
  const totalRooms = rooms.length;
  const totalAttendance = attendance.length;
  const presentToday = attendance.filter((a) => a.status === "Present").length;
  const totalNotices = notices.length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        📊 Hostel Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
        <div className="bg-white shadow-lg p-5 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-2xl font-bold text-purple-600">{totalStudents}</p>
        </div>
        <div className="bg-white shadow-lg p-5 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Total Rooms</h2>
          <p className="text-2xl font-bold text-purple-600">{totalRooms}</p>
        </div>
        <div className="bg-white shadow-lg p-5 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Attendance Records</h2>
          <p className="text-2xl font-bold text-purple-600">
            {totalAttendance}
          </p>
        </div>
        <div className="bg-white shadow-lg p-5 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Present Today</h2>
          <p className="text-2xl font-bold text-green-600">{presentToday}</p>
        </div>
        <div className="bg-white shadow-lg p-5 rounded-xl text-center">
          <h2 className="text-lg font-semibold">Notices</h2>
          <p className="text-2xl font-bold text-red-600">{totalNotices}</p>
        </div>
      </div>

      {/* Recent Notices */}
      <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold mb-3">Recent Notices</h2>
        <ul className="list-disc list-inside space-y-2">
          {notices.map((n) => (
            <li key={n.id}>
              <b>{n.title}</b> - <span className="text-gray-500">{n.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rooms Status */}
      <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
        <h2 className="text-2xl font-semibold mb-3">Room Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((r) => (
            <div key={r.number} className="border p-3 rounded">
              <p>
                <b>Room No:</b> {r.number}
              </p>
              <p>
                <b>Type:</b> {r.type}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    r.status === "Available"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {r.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="bg-white shadow-lg p-5 rounded-xl">
        <h2 className="text-2xl font-semibold mb-3">Attendance Summary</h2>
        <p>Total Records: {totalAttendance}</p>
        <p>Present Today: {presentToday}</p>
        <p>Absent Today: {totalAttendance - presentToday}</p>
      </div>
    </div>
  );
}
