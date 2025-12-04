import React from "react";
import { useAuth } from "../utils/AuthContext";
export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        JAY SHREE RAM HOSTEL — MADHEPURA, BIHAR
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm">Hostel Manager: ER PAPPU YADAV</div>
        {user ? (
          <button
            onClick={logout}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
}
