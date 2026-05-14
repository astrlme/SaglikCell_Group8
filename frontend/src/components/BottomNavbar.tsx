import { NavLink } from "react-router-dom";
import { BarChart3, Home, Plus, Target, User } from "lucide-react";

export default function BottomNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-white px-2 py-2 lg:hidden">
      <NavLink to="/dashboard" className="flex flex-col items-center text-xs text-gray-600">
        <Home size={20} />
        Ana Sayfa
      </NavLink>

      <NavLink to="/analytics" className="flex flex-col items-center text-xs text-gray-600">
        <BarChart3 size={20} />
        Analiz
      </NavLink>

      <button className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#FEC20D] text-[#011062] shadow-lg">
        <Plus size={28} />
      </button>

      <NavLink to="/goals" className="flex flex-col items-center text-xs text-gray-600">
        <Target size={20} />
        Hedef
      </NavLink>

      <NavLink to="/profile" className="flex flex-col items-center text-xs text-gray-600">
        <User size={20} />
        Profil
      </NavLink>
    </nav>
  );
}