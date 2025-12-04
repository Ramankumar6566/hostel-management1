 // src/pages/Rooms.js
import React, { useState, useEffect } from "react";
import RoomForm from "../components/RoomForm";
import RoomCard from "../components/RoomCard";
import { db } from "../utils/storage";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showEmpty, setShowEmpty] = useState(false);

  useEffect(() => {
    const saved = db.get("rooms") || [];
    setRooms(saved);
  }, []);

  const handleSave = (room) => {
    if (room.id) {
      // Update
      const updated = rooms.map(r => r.id === room.id ? room : r);
      setRooms(updated);
      db.set("rooms", updated);
    } else {
      // Add new
      const newRoom = { ...room, id: Date.now(), occupied: 0 };
      const updated = [...rooms, newRoom];
      setRooms(updated);
      db.set("rooms", updated);
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this room?")) {
      const updated = rooms.filter(r => r.id !== id);
      setRooms(updated);
      db.set("rooms", updated);
    }
  };

  const filteredRooms = showEmpty ? rooms.filter(r => r.occupied === 0) : rooms;
  const boysRooms = filteredRooms.filter(r => r.type === "Boys");
  const girlsRooms = filteredRooms.filter(r => r.type === "Girls");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛏️ Room Management</h1>

      <RoomForm room={editing} onSave={handleSave} onCancel={() => setEditing(null)} />

      <div className="mb-4">
        <label>
          <input type="checkbox" checked={showEmpty} onChange={() => setShowEmpty(!showEmpty)} />
          Show Empty Rooms Only
        </label>
      </div>

      <h2 className="text-2xl font-semibold mt-4">Boys Rooms</h2>
      {boysRooms.length === 0 ? <p>No rooms found.</p> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {boysRooms.map(r => <RoomCard key={r.id} room={r} onDelete={handleDelete} onEdit={setEditing} />)}
        </div>
      }

      <h2 className="text-2xl font-semibold mt-6">Girls Rooms</h2>
      {girlsRooms.length === 0 ? <p>No rooms found.</p> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
          {girlsRooms.map(r => <RoomCard key={r.id} room={r} onDelete={handleDelete} onEdit={setEditing} />)}
        </div>
      }
    </div>
  );
}
