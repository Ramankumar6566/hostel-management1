import React, { useEffect, useState } from "react";
import { db } from "../utils/storage";
import { v4 as uuid } from "uuid";

export default function Complaints() {
  const [complaints, setComplaints] = useState(db.get("complaints") || []);
  const [text, setText] = useState("");
  useEffect(() => db.set("complaints", complaints), [complaints]);
  function add() {
    setComplaints((prev) => [{ id: uuid(), text, status: "open" }, ...prev]);
    setText("");
  }
  function close(id) {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "closed" } : c))
    );
  }
  return (
    <div>
      <h1 className="text-2xl mb-4">Complaints & Feedback</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={add}
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
        >
          Submit
        </button>
      </div>
      <div className="space-y-2">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <div>{c.text}</div>
              <div className="text-sm text-gray-500">{c.status}</div>
            </div>
            {c.status === "open" && (
              <button
                onClick={() => close(c.id)}
                className="px-2 py-1 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
