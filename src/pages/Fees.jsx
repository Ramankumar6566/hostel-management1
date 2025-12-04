import React, { useEffect, useState } from "react";
import { db } from "../utils/storage";
import { v4 as uuid } from "uuid";

export default function Fees() {
  const [fees, setFees] = useState(db.get("fees") || []);
  const [form, setForm] = useState({ student: "", amount: "" });
  useEffect(() => db.set("fees", fees), [fees]);
  function add() {
    setFees((prev) => [...prev, { id: uuid(), ...form, paid: false }]);
    setForm({ student: "", amount: "" });
  }
  function markPaid(id) {
    setFees((prev) =>
      prev.map((f) => (f.id === id ? { ...f, paid: true } : f))
    );
  }
  return (
    <div>
      <h1 className="text-2xl mb-4">Fee Management</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex gap-2">
          <input
            placeholder="Student"
            value={form.student}
            onChange={(e) => setForm({ ...form, student: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="p-2 border rounded"
          />
          <button
            onClick={add}
            className="px-3 bg-green-600 text-white rounded"
          >
            Add Fee
          </button>
        </div>
      </div>
      <div className="grid gap-2">
        {fees.map((f) => (
          <div
            key={f.id}
            className="bg-white p-3 rounded shadow flex justify-between"
          >
            <div>
              {f.student} — ₹{f.amount} — {f.paid ? "Paid" : "Due"}
            </div>
            {!f.paid && (
              <button
                onClick={() => markPaid(f.id)}
                className="px-2 py-1 bg-blue-600 text-white rounded"
              >
                Mark Paid
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
