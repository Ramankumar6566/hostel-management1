export const db = {
get(key){
return JSON.parse(localStorage.getItem(key) || '[]')
},
set(key, data){
localStorage.setItem(key, JSON.stringify(data))
}
}// ------------------ ROOMS DATA ------------------
let rooms = JSON.parse(localStorage.getItem("rooms")) || [
  { id: 1, number: "B101", type: "Boys", capacity: 3, occupied: 1 },
  { id: 2, number: "B102", type: "Boys", capacity: 3, occupied: 0 },
  { id: 3, number: "G201", type: "Girls", capacity: 3, occupied: 2 },
  { id: 4, number: "G202", type: "Girls", capacity: 3, occupied: 0 },
];

export const getRooms = () => rooms;

export const saveRooms = (data) => {
  rooms = data;
  localStorage.setItem("rooms", JSON.stringify(rooms));
};

export const addRoom = (room) => {
  rooms.push(room);
  saveRooms(rooms);
};

export const updateRoom = (updatedRoom) => {
  rooms = rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r));
  saveRooms(rooms);
};

export const deleteRoom = (id) => {
  rooms = rooms.filter((room) => room.id !== id);
  saveRooms(rooms);
};
// src/utils/storage.js

// ------------------- Local Storage Wrapper -------------------
export const db = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Storage GET error:", error);
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage SET error:", error);
    }
  },
};

// ------------------- Demo Students -------------------
export const demoStudents = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: i % 2 === 0 ? `Raman Kumar ${i + 1}` : `Anjali Singh ${i + 1}`,
  gender: i % 2 === 0 ? "Male" : "Female",
  age: 18 + (i % 5),
  room: null, // initially no room
  phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
  course: i % 2 === 0 ? "B.Tech" : "BCA",
  photo:
    i % 2 === 0
      ? `https://randomuser.me/api/portraits/men/${i + 1}.jpg`
      : `https://randomuser.me/api/portraits/women/${i + 1}.jpg`,
}));

// ------------------- Demo Rooms -------------------
export const demoRooms = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  roomNumber: `${101 + i}`,
  type: i % 2 === 0 ? "Boys" : "Girls",
  capacity: i % 2 === 0 ? 1 : 2,
  allocatedStudents: [],
  photo: `https://picsum.photos/200/150?random=${i + 1}`,
}));

// ------------------- Initialize Local Storage -------------------
if (!db.get("students")) db.set("students", demoStudents);
if (!db.get("rooms")) db.set("rooms", demoRooms);
