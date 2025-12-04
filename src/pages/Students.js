// src/pages/Students.js
import React, { useState, useEffect } from "react";
import { db } from "../utils/storage";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    gender: "Male",
    age: "",
    phone: "",
    course: "",
    room: "",
    photo: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const data = db.get("students") || [];
    setStudents(data);
  }, []);

  const handleSave = () => {
    if (
      !form.name ||
      !form.gender ||
      !form.age ||
      !form.phone ||
      !form.course ||
      !form.room
    ) {
      alert("Please fill all fields");
      return;
    }

    let updatedStudents;

    if (form.id) {
      updatedStudents = students.map((stu) =>
        stu.id === form.id ? form : stu
      );
    } else {
      updatedStudents = [...students, { ...form, id: Date.now() }];
    }

    setStudents(updatedStudents);
    db.set("students", updatedStudents);

    setShowForm(false);
    setForm({
      id: null,
      name: "",
      gender: "Male",
      age: "",
      phone: "",
      course: "",
      room: "",
      photo: "",
    });
  };

  const handleEdit = (stu) => {
    setForm(stu);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const filtered = students.filter((stu) => stu.id !== id);
    setStudents(filtered);
    db.set("students", filtered);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">👨‍🎓 Students List</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          ➕ Add Student
        </button>
      </div>

      {/* ---------- Student Form ---------- */}
      {showForm && (
        <div className="bg-white p-5 shadow rounded mb-5">
          <h2 className="text-xl font-bold mb-3">
            {form.id ? "Edit Student" : "Add New Student"}
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <input
              className="p-2 border rounded"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <select
              className="p-2 border rounded"
              value={form.gender}
              onChange={(e) =>
                setForm({ ...form, gender: e.target.value })
              }
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              className="p-2 border rounded"
              placeholder="Age"
              type="number"
              value={form.age}
              onChange={(e) =>
                setForm({ ...form, age: e.target.value })
              }
            />

            <input
              className="p-2 border rounded"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              className="p-2 border rounded"
              placeholder="Course"
              value={form.course}
              onChange={(e) =>
                setForm({ ...form, course: e.target.value })
              }
            />

            <input
              className="p-2 border rounded"
              placeholder="Room Number"
              value={form.room}
              onChange={(e) =>
                setForm({ ...form, room: e.target.value })
              }
            />

            <input
              className="p-2 border rounded col-span-3"
              placeholder="Photo URL"
              value={form.photo}
              onChange={(e) =>
                setForm({ ...form, photo: e.target.value })
              }
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ---------- Students List ---------- */}
      <div className="grid grid-cols-4 gap-4">
        {students.map((stu) => (
          <div key={stu.id} className="bg-white p-4 rounded shadow">
            <img
              src={stu.photo}
              alt={stu.name}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-bold mt-2">{stu.name}</h3>
            <p>Gender: {stu.gender}</p>
            <p>Age: {stu.age}</p>
            <p>Course: {stu.course}</p>
            <p>Room: {stu.room}</p>
            <p>📞 {stu.phone}</p>

            <div className="flex gap-3 mt-3">
              <button
                className="bg-yellow-500 px-3 py-1 text-white rounded"
                onClick={() => handleEdit(stu)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 px-3 py-1 text-white rounded"
                onClick={() => handleDelete(stu.id)}
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
