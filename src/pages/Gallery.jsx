 import { useState, useEffect } from "react";

 export default function Gallery() {
   const [images, setImages] = useState([]);
   const [url, setUrl] = useState("");

   // Load from localStorage
   useEffect(() => {
     const saved = JSON.parse(localStorage.getItem("gallery")) || [];
     setImages(saved);
   }, []);

   // Save to localStorage
   useEffect(() => {
     localStorage.setItem("gallery", JSON.stringify(images));
   }, [images]);

   // Add new image
   const addImage = () => {
     if (!url) {
       alert("Please enter image URL!");
       return;
     }
     setImages([...images, { id: Date.now(), url }]);
     setUrl("");
   };

   // Delete image
   const deleteImage = (id) => {
     setImages(images.filter((img) => img.id !== id));
   };

   return (
     <div className="p-6">
       <h1 className="text-3xl font-bold text-purple-700 mb-4">
         🏨 Hostel Gallery
       </h1>

       {/* Add Image */}
       <div className="bg-white shadow-lg p-5 rounded-xl mb-6">
         <h2 className="text-xl font-semibold mb-3">Add New Image</h2>
         <div className="flex gap-2 flex-wrap">
           <input
             type="text"
             placeholder="Image URL"
             className="border p-2 rounded flex-1 min-w-[200px]"
             value={url}
             onChange={(e) => setUrl(e.target.value)}
           />
           <button
             onClick={addImage}
             className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
           >
             Add Image
           </button>
         </div>
       </div>

       {/* Gallery Grid */}
       {images.length === 0 ? (
         <p className="text-gray-500 text-lg">No images yet.</p>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
           {images.map((img) => (
             <div
               key={img.id}
               className="relative rounded overflow-hidden shadow-md"
             >
               <img
                 src={img.url}
                 alt="Hostel"
                 className="w-full h-48 object-cover"
               />
               <button
                 onClick={() => deleteImage(img.id)}
                 className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
               >
                 Delete
               </button>
             </div>
           ))}
         </div>
       )}
     </div>
   );
 }
