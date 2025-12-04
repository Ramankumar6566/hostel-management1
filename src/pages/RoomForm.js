import React, { useState } from "react";
import { addRoom } from "../utils/storage";

const RoomForm = ({ onUpdate }) => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("Boys");
  const [capacity, setCapacity] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRoom = {
      id: Date.now(),
      number,
      type,
      capacity: Number(capacity),
      occupied: 0,
    };

    addRoom(newRoom);

    setNumber("");
    setCapacity(3);

    onUpdate();
  };

  return (
    <form className="bg-white shadow p-4 rounded" onSubmit={handleSubmit}>
      <h2 className="text-xl mb-2 font-semibold">Add Room</h2>

      <input
        type="text"
        placeholder="Room Number"
        className="border p-2 w-full mb-2"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-2"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Boys</option>
        <option>Girls</option>
      </select>

      <input
        type="number"
        className="border p-2 w-full mb-2"
        value={capacity}
        min="1"
        max="10"
        onChange={(e) => setCapacity(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Room
      </button>
    </form>
  );
};

export default RoomForm;
