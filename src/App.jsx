import React from "react";
import Rooms from "./pages/Rooms";
import Mess from "./pages/Mess";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Notices from "./pages/Notices";
import Gallery from "./pages/Gallery";
import Complaints from "./pages/Complaints";
import HostelDetails from "./pages/HostelDetails";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />
              <Route
                path="/students"
                element={
                  <Protected>
                    <Students />
                  </Protected>
                }
              />
              <Route
                path="/rooms"
                element={
                  <Protected>
                    <Rooms />
                  </Protected>
                }
              />
              <Route
                path="/mess"
                element={
                  <Protected>
                    <Mess />
                  </Protected>
                }
              />
              <Route
                path="/fees"
                element={
                  <Protected>
                    <Fees />
                  </Protected>
                }
              />
              <Route
                path="/attendance"
                element={
                  <Protected>
                    <Attendance />
                  </Protected>
                }
              />
              <Route
                path="/notices"
                element={
                  <Protected>
                    <Notices />
                  </Protected>
                }
              />
              <Route
                path="/gallery"
                element={
                  <Protected>
                    <Gallery />
                  </Protected>
                }
              />
              <Route
                path="/complaints"
                element={
                  <Protected>
                    <Complaints />
                  </Protected>
                }
              />
              <Route
                path="/hostel-details"
                element={
                  <Protected>
                    <HostelDetails />
                  </Protected>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
