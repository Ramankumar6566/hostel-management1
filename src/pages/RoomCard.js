import React, { useState } from "react";
import { updateRoom, deleteRoom } from "../utils/storage";

const RoomCard = ({ room, refresh }) => {
  const [edit, setEdit] = useState(false);
  const [capacity, setCapacity] = useState(room.capacity);

  const updateCap = () => {
    updateRoom({ ...room, capacity: Number(capacity) });
    setEdit(false);
    refresh();
  };

  return (
    <div className="p-4 shadow bg-white rounded">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{room.number}</h2>
        <span className="text-sm">({room.type})</span>
      </div>

      <p className="mt-2">
        Capacity: {room.occupied}/{room.capacity}
      </p>

      {edit ? (
        <div>
          <input
            type="number"
            className="border p-1 w-full mt-2"
            value={capacity}
            min={room.occupied}
            onChange={(e) => setCapacity(e.target.value)}
          />

          <button
            className="bg-green-600 text-white px-3 py-1 mt-2 mr-2 rounded"
            onClick={updateCap}
          >
            Save
          </button>
        </div>
      ) : (
        <button
          className="bg-yellow-500 text-white px-3 py-1 mt-2 rounded"
          onClick={() => setEdit(true)}
        >
          Edit Capacity
        </button>
      )}

      <button
        className="bg-red-600 text-white px-3 py-1 mt-2 rounded"
        onClick={() => {
          deleteRoom(room.id);
          refresh();
        }}
      >
        Delete Room
      </button>
    </div>
  );
};

export default RoomCard;
