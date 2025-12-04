 import { useState, useEffect } from "react";

 export default function Contact() {
   const [contacts, setContacts] = useState([]);
   const [form, setForm] = useState({
     name: "",
     email: "",
     message: "",
   });

   // Load from localStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("contacts")) || [];
     setContacts(saved);
   }, []);

   // Save to localStorage
   useEffect(() => {
     localStorage.setItem("contacts", JSON.stringify(contacts));
   }, [contacts]);

   const handleSubmit = () => {
     if (!form.name || !form.email || !form.message) {
       alert("Please fill all fields!");
       return;
     }

     setContacts([...contacts, { id: Date.now(), ...form }]);
     setForm({ name: "", email: "", message: "" });
     alert("Message sent!");
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-green-700 mb-4">
         📬 Contact Hostel
       </h1>

       {/* Hostel Contact Info */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-2">Hostel Details</h2>
         <p>
           <b>Hostel Name:</b> Jay Shree Ram Hostel
         </p>
         <p>
           <b>Location:</b> Madhepura, Bihar
         </p>
         <p>
           <b>Manager:</b> Er Pappu Yadav
         </p>
         <p>
           <b>Email:</b> hostel@example.com
         </p>
         <p>
           <b>Phone:</b> +91-XXXXXXXXXX
         </p>
       </div>

       {/* Contact Form */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Send a Message</h2>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input
             type="text"
             placeholder="Your Name"
             className="border p-2 rounded"
             value={form.name}
             onChange={(e) => setForm({ ...form, name: e.target.value })}
           />
           <input
             type="email"
             placeholder="Your Email"
             className="border p-2 rounded"
             value={form.email}
             onChange={(e) => setForm({ ...form, email: e.target.value })}
           />
           <textarea
             placeholder="Your Message"
             className="border p-2 rounded md:col-span-2"
             value={form.message}
             onChange={(e) => setForm({ ...form, message: e.target.value })}
           />
         </div>

         <button
           onClick={handleSubmit}
           className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
         >
           Send Message
         </button>
       </div>

       {/* Submitted Messages */}
       {contacts.length > 0 && (
         <div className="bg-white shadow-lg p-5 rounded-xl">
           <h2 className="text-xl font-semibold mb-3">Previous Messages</h2>
           <ul className="space-y-3">
             {contacts.map((c) => (
               <li key={c.id} className="border p-3 rounded shadow-sm">
                 <p>
                   <b>Name:</b> {c.name}
                 </p>
                 <p>
                   <b>Email:</b> {c.email}
                 </p>
                 <p>
                   <b>Message:</b> {c.message}
                 </p>
               </li>
             ))}
           </ul>
         </div>
       )}
     </div>
   );
 }
