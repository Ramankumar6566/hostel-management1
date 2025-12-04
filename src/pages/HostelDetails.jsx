 import React from "react";

 export default function HostelDetails() {
   // Sample data
   const rooms = [
     { number: "101", type: "Single", status: "Available" },
     { number: "102", type: "Double", status: "Occupied" },
     { number: "103", type: "Single", status: "Occupied" },
     { number: "104", type: "Double", status: "Available" },
   ];

   const messMenu = [
     {
       day: "Monday",
       breakfast: "Paratha & Tea",
       lunch: "Rice & Dal",
       dinner: "Chapati & Sabzi",
     },
     {
       day: "Tuesday",
       breakfast: "Poha & Milk",
       lunch: "Rice & Rajma",
       dinner: "Chapati & Paneer",
     },
     {
       day: "Wednesday",
       breakfast: "Idli & Chutney",
       lunch: "Rice & Dal",
       dinner: "Chapati & Sabzi",
     },
   ];

   const facilities = [
     "24/7 Security",
     "Wi-Fi Internet",
     "Clean Rooms",
     "Mess Facility",
     "Laundry Service",
     "Recreational Area",
   ];

   const feeStructure = [
     { type: "Single Room", amount: "₹5000 / month" },
     { type: "Double Room", amount: "₹3000 / month" },
     { type: "Mess Charges", amount: "₹2000 / month" },
   ];

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-blue-700 mb-6">
         🏨 Hostel Details
       </h1>

       {/* Facilities */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-2xl font-semibold mb-3">Facilities</h2>
         <ul className="list-disc list-inside space-y-1">
           {facilities.map((f, idx) => (
             <li key={idx}>{f}</li>
           ))}
         </ul>
       </div>

       {/* Rooms */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-2xl font-semibold mb-3">Rooms</h2>
         <table className="w-full border-collapse">
           <thead>
             <tr className="bg-blue-100">
               <th className="border p-2 text-left">Room No</th>
               <th className="border p-2 text-left">Type</th>
               <th className="border p-2 text-left">Status</th>
             </tr>
           </thead>
           <tbody>
             {rooms.map((r) => (
               <tr key={r.number}>
                 <td className="border p-2">{r.number}</td>
                 <td className="border p-2">{r.type}</td>
                 <td
                   className={`border p-2 font-bold ${
                     r.status === "Available"
                       ? "text-green-600"
                       : "text-red-600"
                   }`}
                 >
                   {r.status}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>

       {/* Mess Menu */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-2xl font-semibold mb-3">Mess Menu</h2>
         <table className="w-full border-collapse">
           <thead>
             <tr className="bg-green-100">
               <th className="border p-2 text-left">Day</th>
               <th className="border p-2 text-left">Breakfast</th>
               <th className="border p-2 text-left">Lunch</th>
               <th className="border p-2 text-left">Dinner</th>
             </tr>
           </thead>
           <tbody>
             {messMenu.map((m, idx) => (
               <tr key={idx}>
                 <td className="border p-2">{m.day}</td>
                 <td className="border p-2">{m.breakfast}</td>
                 <td className="border p-2">{m.lunch}</td>
                 <td className="border p-2">{m.dinner}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>

       {/* Fee Structure */}
       <div className="bg-white shadow-lg p-5 rounded-xl">
         <h2 className="text-2xl font-semibold mb-3">Fee Structure</h2>
         <table className="w-full border-collapse">
           <thead>
             <tr className="bg-yellow-100">
               <th className="border p-2 text-left">Type</th>
               <th className="border p-2 text-left">Amount</th>
             </tr>
           </thead>
           <tbody>
             {feeStructure.map((f, idx) => (
               <tr key={idx}>
                 <td className="border p-2">{f.type}</td>
                 <td className="border p-2">{f.amount}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     </div>
   );
 }
