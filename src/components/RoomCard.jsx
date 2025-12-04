// src/components/RoomCard.jsx
import React from "react";

export default function RoomCard({ room, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg shadow p-4 relative hover:scale-105 transform transition">
      <img
        src={room.photo || `https://picsum.photos/200/150?random=${room.id}`}
        alt={`Room ${room.roomNumber}`}
        className="w-full h-32 object-cover rounded mb-2"
      />
      <p className="font-bold text-lg">Room: {room.roomNumber}</p>
      <p>Type: {room.type}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Occupied: {room.allocatedStudents.length}</p>
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => onEdit(room)}
          className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(room.id)}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
