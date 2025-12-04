 import { useState, useEffect } from "react";

 export default function Attendance() {
   const [students, setStudents] = useState([]);
   const [form, setForm] = useState({
     name: "",
     date: "",
     status: "Present", // Present / Absent
   });

   // Load from localStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("attendance")) || [];
     setStudents(saved);
   }, []);

   // Save to localStorage
   useEffect(() => {
     localStorage.setItem("attendance", JSON.stringify(students));
   }, [students]);

   // Add attendance record
   const addAttendance = () => {
     if (!form.name || !form.date) {
       alert("Please enter student name and date");
       return;
     }
     setStudents([...students, { id: Date.now(), ...form }]);
     setForm({ name: "", date: "", status: "Present" });
   };

   // Delete attendance record
   const deleteRecord = (id) => {
     setStudents(students.filter((s) => s.id !== id));
   };

   // Toggle Present/Absent
   const toggleStatus = (id) => {
     setStudents(
       students.map((s) =>
         s.id === id
           ? { ...s, status: s.status === "Present" ? "Absent" : "Present" }
           : s
       )
     );
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-indigo-700 mb-4">
         📝 Student Attendance
       </h1>

       {/* Add Attendance Form */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Mark Attendance</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input
             type="text"
             placeholder="Student Name"
             className="border p-2 rounded"
             value={form.name}
             onChange={(e) => setForm({ ...form, name: e.target.value })}
           />
           <input
             type="date"
             className="border p-2 rounded"
             value={form.date}
             onChange={(e) => setForm({ ...form, date: e.target.value })}
           />
           <select
             className="border p-2 rounded"
             value={form.status}
             onChange={(e) => setForm({ ...form, status: e.target.value })}
           >
             <option value="Present">Present</option>
             <option value="Absent">Absent</option>
           </select>
         </div>

         <button
           onClick={addAttendance}
           className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
         >
           Add Record
         </button>
       </div>

       {/* Attendance Records */}
       {students.length === 0 ? (
         <p className="text-gray-500 text-lg">No attendance records yet.</p>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {students.map((s) => (
             <div key={s.id} className="bg-white shadow-md rounded-xl p-5">
               <h3 className="text-xl font-bold text-indigo-700 mb-2">
                 {s.name}
               </h3>
               <p>
                 <b>Date:</b> {s.date}
               </p>
               <p>
                 <b>Status:</b>{" "}
                 <span
                   className={`font-bold ${
                     s.status === "Present" ? "text-green-600" : "text-red-600"
                   }`}
                 >
                   {s.status}
                 </span>
               </p>

               <div className="mt-3 flex gap-2">
                 <button
                   onClick={() => toggleStatus(s.id)}
                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                 >
                   Toggle Status
                 </button>
                 <button
                   onClick={() => deleteRecord(s.id)}
                   className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                 >
                   Delete
                 </button>
               </div>
             </div>
           ))}
         </div>
       )}
     </div>
   );
 }

