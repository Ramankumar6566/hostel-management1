 import { useEffect, useState } from "react";

 export default function Mess() {
   const [items, setItems] = useState([]);
   const [form, setForm] = useState({
     day: "",
     breakfast: "",
     lunch: "",
     dinner: "",
   });

   // Load from localStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("messMenu")) || [];
     setItems(saved);
   }, []);

   // Save every update
   useEffect(() => {
     localStorage.setItem("messMenu", JSON.stringify(items));
   }, [items]);

   // Add Menu
   const addMenu = () => {
     if (!form.day) {
       alert("Please select day!");
       return;
     }

     setItems([...items, { id: Date.now(), ...form }]);

     setForm({
       day: "",
       breakfast: "",
       lunch: "",
       dinner: "",
     });
   };

   const deleteMenu = (id) => {
     setItems(items.filter((m) => m.id !== id));
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-green-700 mb-4">
         🍽️ Hostel Mess Menu
       </h1>

       {/* Add Menu Form */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Add Weekly Menu</h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <select
             className="border p-2 rounded"
             value={form.day}
             onChange={(e) => setForm({ ...form, day: e.target.value })}
           >
             <option value="">Select Day</option>
             <option>Monday</option>
             <option>Tuesday</option>
             <option>Wednesday</option>
             <option>Thursday</option>
             <option>Friday</option>
             <option>Saturday</option>
             <option>Sunday</option>
           </select>

           <input
             type="text"
             placeholder="Breakfast"
             className="border p-2 rounded"
             value={form.breakfast}
             onChange={(e) => setForm({ ...form, breakfast: e.target.value })}
           />

           <input
             type="text"
             placeholder="Lunch"
             className="border p-2 rounded"
             value={form.lunch}
             onChange={(e) => setForm({ ...form, lunch: e.target.value })}
           />

           <input
             type="text"
             placeholder="Dinner"
             className="border p-2 rounded"
             value={form.dinner}
             onChange={(e) => setForm({ ...form, dinner: e.target.value })}
           />
         </div>

         <button
           onClick={addMenu}
           className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
         >
           Add Menu
         </button>
       </div>

       {/* Menu List */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {items.length === 0 ? (
           <p className="text-gray-500 text-lg">No Menu Added.</p>
         ) : (
           items.map((m) => (
             <div key={m.id} className="bg-white shadow-md rounded-xl p-5">
               <h3 className="text-2xl font-bold text-green-700 mb-2">
                 {m.day}
               </h3>

               <p>
                 <b>Breakfast:</b> {m.breakfast}
               </p>
               <p>
                 <b>Lunch:</b> {m.lunch}
               </p>
               <p>
                 <b>Dinner:</b> {m.dinner}
               </p>

               <button
                 onClick={() => deleteMenu(m.id)}
                 className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
               >
                 Delete Menu
               </button>
             </div>
           ))
         )}
       </div>
     </div>
   );
 }
