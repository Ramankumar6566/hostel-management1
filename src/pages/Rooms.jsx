 import { useEffect, useState } from "react";

 export default function Rooms() {
   const [rooms, setRooms] = useState([]);
   const [form, setForm] = useState({
     roomNo: "",
     type: "", // Single / Double / Triple
     capacity: "",
     occupied: "",
     photo: "",
   });

   // Load rooms from LocalStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("rooms")) || [];
     setRooms(saved);
   }, []);

   useEffect(() => {
     localStorage.setItem("rooms", JSON.stringify(rooms));
   }, [rooms]);

   // Add Room
   const addRoom = () => {
     if (!form.roomNo || !form.type) {
       alert("Please enter Room No & Type");
       return;
     }

     setRooms([...rooms, { id: Date.now(), ...form }]);

     setForm({
       roomNo: "",
       type: "",
       capacity: "",
       occupied: "",
       photo: "",
     });
   };

   // Delete Room
   const deleteRoom = (id) => {
     setRooms(rooms.filter((r) => r.id !== id));
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-purple-700 mb-4">
         🏠 Hostel Rooms Management
       </h1>

       {/* Add Room Form */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Add New Room</h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input
             type="text"
             placeholder="Room Number"
             className="border p-2 rounded"
             value={form.roomNo}
             onChange={(e) => setForm({ ...form, roomNo: e.target.value })}
           />

           <select
             className="border p-2 rounded"
             value={form.type}
             onChange={(e) => setForm({ ...form, type: e.target.value })}
           >
             <option value="">Select Room Type</option>
             <option value="Single Bed">Single Bed</option>
             <option value="Double Bed">Double Bed</option>
             <option value="Triple Bed">Triple Bed</option>
           </select>

           <input
             type="number"
             placeholder="Capacity (e.g., 2)"
             className="border p-2 rounded"
             value={form.capacity}
             onChange={(e) => setForm({ ...form, capacity: e.target.value })}
           />

           <input
             type="number"
             placeholder="Occupied (e.g., 1)"
             className="border p-2 rounded"
             value={form.occupied}
             onChange={(e) => setForm({ ...form, occupied: e.target.value })}
           />

           <input
             type="text"
             placeholder="Photo URL (optional)"
             className="border p-2 rounded"
             value={form.photo}
             onChange={(e) => setForm({ ...form, photo: e.target.value })}
           />
         </div>

         <button
           onClick={addRoom}
           className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
         >
           Add Room
         </button>
       </div>

       {/* Rooms List */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {rooms.length === 0 ? (
           <p className="text-gray-500 text-lg">No rooms added yet.</p>
         ) : (
           rooms.map((r) => (
             <div key={r.id} className="bg-white shadow-md rounded-xl p-4">
               <h3 className="text-xl font-bold mb-2 text-purple-700">
                 Room {r.roomNo}
               </h3>

               {r.photo ? (
                 <img
                   src={r.photo}
                   alt=""
                   className="w-full h-40 object-cover rounded-lg mb-3"
                 />
               ) : (
                 <div className="w-full h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-500">
                   No Photo
                 </div>
               )}

               <p>
                 <b>Type:</b> {r.type}
               </p>
               <p>
                 <b>Capacity:</b> {r.capacity}
               </p>
               <p>
                 <b>Occupied:</b> {r.occupied}
               </p>
               <p>
                 <b>Available:</b>{" "}
                 <span className="text-green-600 font-bold">
                   {r.capacity - r.occupied}
                 </span>
               </p>

               <button
                 onClick={() => deleteRoom(r.id)}
                 className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
               >
                 Delete Room
               </button>
             </div>
           ))
         )}
       </div>
     </div>
   );
 }
// src/pages/Rooms.jsx
import React, { useState, useEffect } from "react";
import { db, demoRooms } from "../utils/storage";
import RoomForm from "../components/RoomForm";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [search, setSearch] = useState("");
  const [filterEmpty, setFilterEmpty] = useState(false);

  // Load rooms
  useEffect(() => {
    const saved = db.get("rooms") || demoRooms;
    setRooms(saved);
  }, []);

  // Save rooms
  useEffect(() => {
    db.set("rooms", rooms);
  }, [rooms]);

  // Add / Update Room
  const saveRoom = (room) => {
    if (editRoom) {
      setRooms(rooms.map(r => (r.id === room.id ? room : r)));
      setEditRoom(null);
    } else {
      setRooms([...rooms, { ...room, id: Date.now(), allocatedStudents: [] }]);
    }
    setFormVisible(false);
  };

  // Delete Room
  const deleteRoom = (id) => {
    if (window.confirm("Are you sure to delete this room?")) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  // Filtered Rooms
  let filtered = rooms.filter(r =>
    r.roomNumber.toLowerCase().includes(search.toLowerCase())
  );

  if (filterEmpty) filtered = filtered.filter(r => r.allocatedStudents.length === 0);

  const boysRooms = filtered.filter(r => r.type === "Boys");
  const girlsRooms = filtered.filter(r => r.type === "Girls");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">🛏️ Hostel Rooms Management</h1>

      <div className="flex gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setFormVisible(!formVisible)}
        >
          {formVisible ? "Close Form" : "Add New Room"}
        </button>
        <input
          type="text"
          placeholder="Search by Room Number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filterEmpty}
            onChange={() => setFilterEmpty(!filterEmpty)}
          />
          Show Empty Rooms Only
        </label>
      </div>

      {formVisible && (
        <RoomForm
          room={editRoom}
          onSave={saveRoom}
          onCancel={() => {
            setEditRoom(null);
            setFormVisible(false);
          }}
        />
      )}

      {/* Boys Rooms */}
      <h2 className="text-xl font-semibold mt-6">Boys Rooms</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {boysRooms.length === 0 ? (
          <p>No boys rooms found</p>
        ) : (
          boysRooms.map(room => (
            <div key={room.id} className="border p-2 rounded shadow relative">
              <img src={room.photo} alt={room.roomNumber} className="w-full h-32 object-cover rounded" />
              <p className="font-bold mt-2">{room.roomNumber}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Occupied: {room.allocatedStudents.length}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditRoom(room);
                    setFormVisible(true);
                  }}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Girls Rooms */}
      <h2 className="text-xl font-semibold mt-6">Girls Rooms</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
        {girlsRooms.length === 0 ? (
          <p>No girls rooms found</p>
        ) : (
          girlsRooms.map(room => (
            <div key={room.id} className="border p-2 rounded shadow relative">
              <img src={room.photo} alt={room.roomNumber} className="w-full h-32 object-cover rounded" />
              <p className="font-bold mt-2">{room.roomNumber}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Occupied: {room.allocatedStudents.length}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setEditRoom(room);
                    setFormVisible(true);
                  }}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteRoom(room.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import { db } from "../utils/storage";
import RoomForm from "../components/RoomForm";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedRooms = db.get("rooms") || [];
    setRooms(savedRooms);
  }, []);

  useEffect(() => {
    db.set("rooms", rooms);
  }, [rooms]);

  const saveRoom = (room) => {
    if (editingRoom) {
      setRooms(rooms.map((r) => (r.id === room.id ? room : r)));
      setEditingRoom(null);
    } else {
      const newRoom = { ...room, id: Date.now(), allocatedStudents: [] };
      setRooms([...rooms, newRoom]);
    }
  };

  const deleteRoom = (id) => {
    if (window.confirm("Are you sure to delete this room?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  const filteredRooms =
    filter === "All" ? rooms : rooms.filter((r) => r.type === filter);

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🛏️ Room Management</h1>

      <RoomForm room={editingRoom} onSave={saveRoom} onCancel={() => setEditingRoom(null)} />

      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter("All")} className="bg-gray-200 px-4 py-1 rounded">All</button>
        <button onClick={() => setFilter("Boys")} className="bg-blue-200 px-4 py-1 rounded">Boys</button>
        <button onClick={() => setFilter("Girls")} className="bg-pink-200 px-4 py-1 rounded">Girls</button>
        <button onClick={() => setFilter("Empty")} className="bg-green-200 px-4 py-1 rounded">Empty</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <div key={room.id} className="border rounded shadow p-4 relative">
            <img src={room.photo} alt={room.roomNumber} className="w-full h-32 object-cover rounded mb-2" />
            <p className="font-bold">Room: {room.roomNumber}</p>
            <p>Type: {room.type}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Allocated: {room.allocatedStudents.length}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => setEditingRoom(room)} className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button onClick={() => deleteRoom(room.id)} className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// src/pages/Rooms.jsx
import React, { useState, useEffect } from "react";
import { db } from "../utils/storage";
import RoomForm from "../components/RoomForm";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const data = db.get("rooms");
    if (data) setRooms(data);
  }, []);

  const saveRoom = (room) => {
    let updatedRooms;
    if (room.id) {
      // edit
      updatedRooms = rooms.map((r) => (r.id === room.id ? room : r));
    } else {
      // add new
      room.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1;
      updatedRooms = [...rooms, room];
    }
    setRooms(updatedRooms);
    db.set("rooms", updatedRooms);
    setEditingRoom(null);
  };

  const deleteRoom = (id) => {
    if (!window.confirm("Delete this room?")) return;
    const updatedRooms = rooms.filter((r) => r.id !== id);
    setRooms(updatedRooms);
    db.set("rooms", updatedRooms);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <RoomForm room={editingRoom} onSave={saveRoom} onCancel={() => setEditingRoom(null)} />
      <div className="grid md:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white shadow rounded p-4 flex flex-col">
            <img src={room.photo} alt="" className="w-full h-32 object-cover rounded mb-2" />
            <h2 className="font-bold text-lg">Room {room.roomNumber}</h2>
            <p>Type: {room.type}</p>
            <p>Capacity: {room.capacity}</p>
            <p>Allocated: {room.allocatedStudents.length}</p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => setEditingRoom(room)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteRoom(room.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

