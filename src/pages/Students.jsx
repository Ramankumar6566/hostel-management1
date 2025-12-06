 import React, { useEffect, useState } from "react";
 import { db } from "../utils/storage";

 const Students = () => {
   const [students, setStudents] = useState([]);
   const [search, setSearch] = useState("");
   const [form, setForm] = useState({
     name: "",
     gender: "Male",
     age: 18,
     room: "",
     course: "",
     phone: "",
     photo: "",
   });

   // Initialize demo students if not present
   useEffect(() => {
     let saved = db.get("students");
     if (!saved || saved.length === 0) {
       saved = Array.from({ length: 50 }, (_, i) => ({
         id: i + 1,
         name: i % 2 === 0 ? `Raman Kumar ${i + 1}` : `Anjali Singh ${i + 1}`,
         gender: i % 2 === 0 ? "Male" : "Female",
         age: 18 + (i % 5),
         room: `${101 + i}`,
         course: i % 2 === 0 ? "B.Tech" : "BCA",
         phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
         photo:
           const students = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
  room: `Room ${101 + i}`,
  photo:
    i % 2 === 0
      ? "https://tse4.mm.bing.net/th/id/OIP.U828eE6tS7Vej6Dt6jWdBgHaEK?pid=Api&P=0&h=180"
      : "https://husbandsinfo.com/wp-content/uploads/2025/11/Smriti-Mandhana-768x448.png",
}));

       }));
       db.set("students", saved);
     }
     setStudents(saved);
   }, []);

   // Save to LocalStorage whenever students change
   useEffect(() => {
     db.set("students", students);
   }, [students]);

   const addStudent = () => {
     if (!form.name || !form.room) {
       alert("Please fill name & room!");
       return;
     }
     const newStudent = {
       id: Date.now(),
       ...form,
       photo:
         form.photo ||
         (form.gender === "Male"
           ? `https://randomuser.me/api/portraits/men/${
               students.length + 1
             }.jpg`
           : `https://randomuser.me/api/portraits/women/${
               students.length + 1
             }.jpg`),
     };
     setStudents([...students, newStudent]);
     setForm({
       name: "",
       gender: "Male",
       age: 18,
       room: "",
       course: "",
       phone: "",
       photo: "",
     });
   };

   const deleteStudent = (id) => {
     if (window.confirm("Are you sure you want to delete this student?")) {
       setStudents(students.filter((s) => s.id !== id));
     }
   };

   const filtered = students.filter((s) =>
     s.name.toLowerCase().includes(search.toLowerCase())
   );
   const boys = filtered.filter((s) => s.gender === "Male");
   const girls = filtered.filter((s) => s.gender === "Female");
   const genderColor = (gender) =>
     gender === "Male"
       ? "bg-blue-100 text-blue-800"
       : "bg-pink-100 text-pink-800";

   return (
     <div className="p-5 md:p-10">
       <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
         🏫 Hostel Students Dashboard
       </h1>

       {/* Add Student Form */}
       <div className="bg-white shadow-lg p-6 rounded-xl mb-8">
         <h2 className="text-2xl font-semibold mb-4">Add New Student</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           <input
             type="text"
             placeholder="Name"
             value={form.name}
             onChange={(e) => setForm({ ...form, name: e.target.value })}
             className="border p-2 rounded w-full focus:outline-blue-400"
           />
           <select
             value={form.gender}
             onChange={(e) => setForm({ ...form, gender: e.target.value })}
             className="border p-2 rounded w-full"
           >
             <option value="Male">Male</option>
             <option value="Female">Female</option>
           </select>
           <input
             type="number"
             placeholder="Age"
             value={form.age}
             onChange={(e) => setForm({ ...form, age: e.target.value })}
             className="border p-2 rounded w-full"
           />
           <input
             type="text"
             placeholder="Room"
             value={form.room}
             onChange={(e) => setForm({ ...form, room: e.target.value })}
             className="border p-2 rounded w-full"
           />
           <input
             type="text"
             placeholder="Course"
             value={form.course}
             onChange={(e) => setForm({ ...form, course: e.target.value })}
             className="border p-2 rounded w-full"
           />
           <input
             type="text"
             placeholder="Phone"
             value={form.phone}
             onChange={(e) => setForm({ ...form, phone: e.target.value })}
             className="border p-2 rounded w-full"
           />
           <input
             type="text"
             placeholder="Photo URL (optional)"
             value={form.photo}
             onChange={(e) => setForm({ ...form, photo: e.target.value })}
             className="border p-2 rounded w-full col-span-1 md:col-span-3"
           />
         </div>
         <button
           onClick={addStudent}
           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
         >
           Add Student
         </button>
       </div>

       {/* Search */}
       <input
         type="text"
         placeholder="Search students by name..."
         className="border p-2 rounded w-full mb-8 focus:outline-blue-400"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
       />

       {/* Boys Section */}
       <h2 className="text-3xl font-semibold mb-4">Boys</h2>
       {boys.length === 0 ? (
         <p className="text-gray-500 mb-6">No boys found</p>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
           {boys.map((s) => (
             <div
               key={s.id}
               className={`relative border rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ${genderColor(
                 s.gender
               )}`}
             >
               <img
                 src={s.photo}
                 alt={s.name}
                 className="w-full h-40 object-cover"
               />
               <div className="p-4">
                 <p className="font-bold text-lg">{s.name}</p>
                 <p>Age: {s.age}</p>
                 <p>Room: {s.room}</p>
                 <p>Course: {s.course}</p>
                 <p>Phone: {s.phone}</p>
               </div>
               <button
                 onClick={() => deleteStudent(s.id)}
                 className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
               >
                 Delete
               </button>
             </div>
           ))}
         </div>
       )}

       {/* Girls Section */}
       <h2 className="text-3xl font-semibold mb-4">Girls</h2>
       {girls.length === 0 ? (
         <p className="text-gray-500">No girls found</p>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {girls.map((s) => (
             <div
               key={s.id}
               className={`relative border rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ${genderColor(
                 s.gender
               )}`}
             >
               <img
                 src={s.photo}
                 alt={s.name}
                 className="w-full h-40 object-cover"
               />
               <div className="p-4">
                 <p className="font-bold text-lg">{s.name}</p>
                 <p>Age: {s.age}</p>
                 <p>Room: {s.room}</p>
                 <p>Course: {s.course}</p>
                 <p>Phone: {s.phone}</p>
               </div>
               <button
                 onClick={() => deleteStudent(s.id)}
                 className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
               >
                 Delete
               </button>
             </div>
           ))}
         </div>
       )}
     </div>
   );
 };

 export default Students;


