import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Premium from "./pages/Premium";
import Subscription from "./pages/Subscription";
import Goals from "./pages/Goals";
import Admin from "./pages/Admin";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}
