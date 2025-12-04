import React from "react";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to Sona Hostel</h1>
      <p className="text-gray-700 mb-6">
        Hostel Manager: <span className="font-semibold">@Er Pappu Yadav</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Students</h2>
          <p>Total enrolled students: 120</p>
        </div>

        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Rooms</h2>
          <p>Total rooms available: 40</p>
        </div>

        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Mess</h2>
          <p>Today's menu: Dal, Rice, Chapati, Sabzi</p>
        </div>
      </div>
    </div>
  );
}
