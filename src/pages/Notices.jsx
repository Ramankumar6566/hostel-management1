 import { useEffect, useState } from "react";

 export default function Notices() {
   const [notices, setNotices] = useState([]);
   const [form, setForm] = useState({
     title: "",
     date: "",
     description: "",
   });

   // Load notices from localStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("notices")) || [];
     setNotices(saved);
   }, []);

   // Save notices to localStorage whenever changes
   useEffect(() => {
     localStorage.setItem("notices", JSON.stringify(notices));
   }, [notices]);

   // Add notice
   const addNotice = () => {
     if (!form.title || !form.date) {
       alert("Please fill title and date!");
       return;
     }

     setNotices([...notices, { id: Date.now(), ...form }]);

     setForm({ title: "", date: "", description: "" });
   };

   // Delete notice
   const deleteNotice = (id) => {
     setNotices(notices.filter((n) => n.id !== id));
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-yellow-700 mb-4">
         📢 Hostel Notices
       </h1>

       {/* Add Notice Form */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Add New Notice</h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input
             type="text"
             placeholder="Notice Title"
             className="border p-2 rounded"
             value={form.title}
             onChange={(e) => setForm({ ...form, title: e.target.value })}
           />

           <input
             type="date"
             className="border p-2 rounded"
             value={form.date}
             onChange={(e) => setForm({ ...form, date: e.target.value })}
           />

           <textarea
             placeholder="Description"
             className="border p-2 rounded md:col-span-2"
             value={form.description}
             onChange={(e) => setForm({ ...form, description: e.target.value })}
           />
         </div>

         <button
           onClick={addNotice}
           className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
         >
           Add Notice
         </button>
       </div>

       {/* Notices List */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {notices.length === 0 ? (
           <p className="text-gray-500 text-lg">No notices available.</p>
         ) : (
           notices.map((n) => (
             <div key={n.id} className="bg-white shadow-md rounded-xl p-5">
               <h3 className="text-2xl font-bold text-yellow-700 mb-2">
                 {n.title}
               </h3>
               <p className="text-gray-500 text-sm mb-2">{n.date}</p>
               <p>{n.description}</p>

               <button
                 onClick={() => deleteNotice(n.id)}
                 className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
               >
                 Delete Notice
               </button>
             </div>
           ))
         )}
       </div>
     </div>
   );
 }
