import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Target,
  Crown,
  Bell,
  Settings,
  ShieldCheck,
} from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analytics", label: "Analizler", icon: BarChart3 },
  { to: "/goals", label: "Hedefler", icon: Target },
  { to: "/premium", label: "Premium", icon: Crown },
  { to: "/admin", label: "Yönetici", icon: ShieldCheck },
  { to: "/notifications", label: "Bildirimler", icon: Bell },
  { to: "/settings", label: "Ayarlar", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 bg-[#011062] p-4 text-white lg:block">
      <div className="mb-8 rounded-2xl bg-white/10 p-4">
        <h1 className="text-2xl font-bold text-[#FEC20D]">SağlıkCell</h1>
        <p className="mt-1 text-xs text-white/70">Sağlıklı kod, sağlıklı yaşam</p>
      </div>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#FEC20D] font-semibold text-[#011062]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}