import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
// import DashboardHome later when ready

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}
