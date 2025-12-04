import React from "react";
import { db } from "../utils/storage";

export default function Dashboard() {
  const students = db.get("students");
  const rooms = db.get("rooms");
  const occupied = rooms.filter(
    (r) => r.occupants && r.occupants.length > 0
  ).length;
  const available = rooms.length - occupied;
  const pendingFees = db.get("fees").filter((f) => !f.paid).length;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded shadow">
          Total Students
          <br />
          <strong>{students.length}</strong>
        </div>
        <div className="p-4 bg-white rounded shadow">
          Total Rooms
          <br />
          <strong>{rooms.length}</strong>
        </div>
        <div className="p-4 bg-white rounded shadow">
          Available Rooms
          <br />
          <strong>{available}</strong>
        </div>
        <div className="p-4 bg-white rounded shadow">
          Pending Fees
          <br />
          <strong>{pendingFees}</strong>
        </div>
      </div>
    </div>
  );
}
