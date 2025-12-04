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
  room: `${101 + i}`,
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

// ------------------- Demo Mess -------------------
export const demoMess = [
  { day: "Monday", breakfast: "Poha", lunch: "Rice & Dal", dinner: "Chapati & Sabzi" },
  { day: "Tuesday", breakfast: "Upma", lunch: "Rice & Rajma", dinner: "Chapati & Paneer" },
  { day: "Wednesday", breakfast: "Idli", lunch: "Rice & Dal", dinner: "Chapati & Sabzi" },
  { day: "Thursday", breakfast: "Paratha", lunch: "Rice & Chole", dinner: "Chapati & Paneer" },
  { day: "Friday", breakfast: "Dhokla", lunch: "Rice & Dal", dinner: "Chapati & Sabzi" },
  { day: "Saturday", breakfast: "Poha", lunch: "Rice & Rajma", dinner: "Chapati & Paneer" },
  { day: "Sunday", breakfast: "Pancakes", lunch: "Rice & Dal", dinner: "Chapati & Sabzi" },
];

// ------------------- Demo Notices -------------------
export const demoNotices = [
  { id: 1, title: "Maintenance Notice", date: "2025-12-05", description: "Water supply off 9 AM - 1 PM" },
  { id: 2, title: "Exam Notice", date: "2025-12-10", description: "Mid-term exams schedule released" },
  { id: 3, title: "Event Notice", date: "2025-12-15", description: "Annual sports day in hostel ground" },
];

// ------------------- Demo Fee -------------------
export const demoFee = demoStudents.map((stu) => ({
  studentId: stu.id,
  name: stu.name,
  total: 5000,
  paid: Math.floor(Math.random() * 5000),
  due: Math.max(0, 5000 - Math.floor(Math.random() * 5000)),
}));

// ------------------- Initialize Local Storage -------------------
if (!db.get("students")) db.set("students", demoStudents);
if (!db.get("rooms")) db.set("rooms", demoRooms);
if (!db.get("mess")) db.set("mess", demoMess);
if (!db.get("notices")) db.set("notices", demoNotices);
if (!db.get("fee")) db.set("fee", demoFee);

