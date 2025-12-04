 // src/pages/AllocateRoom.jsx

import React, { useEffect, useState } from "react";
import { db } from "../utils/storage";

const AllocateRoom = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Load Data
  useEffect(() => {
    setStudents(db.get("students") || []);
    setRooms(db.get("rooms") || []);
  }, []);

  // Allocate Room Logic
  const allocateRoom = () => {
    if (!selectedStudent || !selectedRoom) {
      alert("Please select both Student & Room!");
      return;
    }

    let updatedStudents = [...students];
    let updatedRooms = [...rooms];

    // Update Student Room
    updatedStudents = updatedStudents.map((stu) =>
      stu.id === selectedStudent.id ? { ...stu, room: selectedRoom.roomNumber } : stu
    );

    // Add Student to allocatedStudents inside room
    updatedRooms = updatedRooms.map((room) =>
      room.id === selectedRoom.id
        ? {
            ...room,
            allocatedStudents: [...room.allocatedStudents, selectedStudent.name],
          }
        : room
    );

    // Save
    db.set("students", updatedStudents);
    db.set("rooms", updatedRooms);

    setStudents(updatedStudents);
    setRooms(updatedRooms);

    alert("Room Allocated Successfully 🎉");
    setSelectedStudent(null);
    setSelectedRoom(null);
  };

  return (
    <div className="p-5 ml-64">
      <h1 className="text-3xl font-bold mb-5">🛏️ Allocate Room</h1>

      <div className="grid grid-cols-2 gap-5">

        {/* Students Section */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold mb-3">Select Student</h2>

          <div className="h-96 overflow-y-scroll border rounded p-2">
            {students.map((stu) => (
              <div
                key={stu.id}
                onClick={() => setSelectedStudent(stu)}
                className={`p-3 border rounded mb-2 cursor-pointer ${
                  selectedStudent?.id === stu.id ? "bg-blue-200" : "bg-gray-100"
                }`}
              >
                <p className="font-semibold">{stu.name}</p>
                <p className="text-sm">Course: {stu.course}</p>
                <p className="text-sm">Current Room: {stu.room}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rooms Section */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold mb-3">Select Room</h2>

          <div className="h-96 overflow-y-scroll border rounded p-2">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-3 border rounded mb-2 cursor-pointer ${
                  selectedRoom?.id === room.id ? "bg-green-200" : "bg-gray-100"
                }`}
              >
                <p className="font-semibold">
                  Room: {room.roomNumber} ({room.type})
                </p>
                <p className="text-sm">
                  Capacity: {room.capacity} | Allocated: {room.allocatedStudents.length}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Allocate Button */}
      <button
        onClick={allocateRoom}
        className="mt-6 px-5 py-3 bg-blue-600 text-white rounded text-lg"
      >
        Allocate Room
      </button>
    </div>
  );
};

export default AllocateRoom;
