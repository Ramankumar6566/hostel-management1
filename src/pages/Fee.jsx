 import { useEffect, useState } from "react";

 export default function Fee() {
   const [fees, setFees] = useState([]);
   const [form, setForm] = useState({
     studentName: "",
     roomNo: "",
     amount: "",
     status: "Unpaid", // Paid / Unpaid
   });

   // Load from localStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("fees")) || [];
     setFees(saved);
   }, []);

   // Save to localStorage
   useEffect(() => {
     localStorage.setItem("fees", JSON.stringify(fees));
   }, [fees]);

   // Add Fee Record
   const addFee = () => {
     if (!form.studentName || !form.roomNo || !form.amount) {
       alert("Please fill all required fields");
       return;
     }

     setFees([...fees, { id: Date.now(), ...form }]);
     setForm({ studentName: "", roomNo: "", amount: "", status: "Unpaid" });
   };

   // Delete Fee Record
   const deleteFee = (id) => {
     setFees(fees.filter((f) => f.id !== id));
   };

   // Toggle Paid/Unpaid
   const toggleStatus = (id) => {
     setFees(
       fees.map((f) =>
         f.id === id
           ? { ...f, status: f.status === "Paid" ? "Unpaid" : "Paid" }
           : f
       )
     );
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-blue-700 mb-4">
         💵 Hostel Fee Management
       </h1>

       {/* Add Fee Form */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Add Fee Record</h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input
             type="text"
             placeholder="Student Name"
             className="border p-2 rounded"
             value={form.studentName}
             onChange={(e) => setForm({ ...form, studentName: e.target.value })}
           />

           <input
             type="text"
             placeholder="Room Number"
             className="border p-2 rounded"
             value={form.roomNo}
             onChange={(e) => setForm({ ...form, roomNo: e.target.value })}
           />

           <input
             type="number"
             placeholder="Amount"
             className="border p-2 rounded"
             value={form.amount}
             onChange={(e) => setForm({ ...form, amount: e.target.value })}
           />

           <select
             className="border p-2 rounded"
             value={form.status}
             onChange={(e) => setForm({ ...form, status: e.target.value })}
           >
             <option value="Unpaid">Unpaid</option>
             <option value="Paid">Paid</option>
           </select>
         </div>

         <button
           onClick={addFee}
           className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
         >
           Add Fee
         </button>
       </div>

       {/* Fee List */}
       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {fees.length === 0 ? (
           <p className="text-gray-500 text-lg">No fee records yet.</p>
         ) : (
           fees.map((f) => (
             <div key={f.id} className="bg-white shadow-md rounded-xl p-5">
               <h3 className="text-xl font-bold text-blue-700 mb-2">
                 {f.studentName}
               </h3>
               <p>
                 <b>Room No:</b> {f.roomNo}
               </p>
               <p>
                 <b>Amount:</b> ₹{f.amount}
               </p>
               <p>
                 <b>Status:</b>{" "}
                 <span
                   className={`font-bold ${
                     f.status === "Paid" ? "text-green-600" : "text-red-600"
                   }`}
                 >
                   {f.status}
                 </span>
               </p>

               <div className="mt-3 flex gap-2">
                 <button
                   onClick={() => toggleStatus(f.id)}
                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                 >
                   Toggle Status
                 </button>

                 <button
                   onClick={() => deleteFee(f.id)}
                   className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                 >
                   Delete
                 </button>
               </div>
             </div>
           ))
         )}
       </div>
     </div>
   );
 }
