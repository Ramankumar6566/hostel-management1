 // src/components/RoomForm.jsx
import React, { useState, useEffect } from "react";

export default function RoomForm({ room, onSave, onCancel }) {
  const [form, setForm] = useState({
    roomNumber: "",
    type: "Boys",
    capacity: 1,
    allocatedStudents: [],
    photo: "",
  });

  // Editing mode → form में data set करो
  useEffect(() => {
    if (room) setForm(room);
  }, [room]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.roomNumber) {
      alert("Room number is required!");
      return;
    }

    onSave(form);

    // reset form
    setForm({
      roomNumber: "",
      type: "Boys",
      capacity: 1,
      allocatedStudents: [],
      photo: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow grid gap-4 md:grid-cols-2 mb-4"
    >
      <input
        type="text"
        placeholder="Room Number"
        value={form.roomNumber}
        onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
        className="border p-2 rounded w-full"
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="border p-2 rounded w-full"
      >
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>
      </select>

      <input
        type="number"
        placeholder="Capacity"
        value={form.capacity}
        onChange={(e) =>
          setForm({ ...form, capacity: Number(e.target.value) })
        }
        className="border p-2 rounded w-full"
      />

      <input
        type="text"
        placeholder="Photo URL"
        value={form.photo}
        onChange={(e) => setForm({ ...form, photo: e.target.value })}
        className="border p-2 rounded w-full"
      />

      <div className="sm:col-span-2 flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {room ? "Update Room" : "Add Room"}
        </button>

        {room && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
