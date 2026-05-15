import {
  Shield,
  Users,
  Activity,
  Target,
  Search,
  MoreVertical,
  Settings,
  BarChart3,
  Bell,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

export default function Admin() {
  const stats = [
    { title: "Toplam Kullanıcı", value: "1.248", icon: Users },
    { title: "Premium Kullanıcı", value: "342", icon: Shield },
    { title: "Aktif Hedef", value: "856", icon: Target },
    { title: "Bugünkü Metrik", value: "3.421", icon: Activity },
  ];

  const users = [
    { name: "Ali Sağlıklı", role: "Ücretsiz", status: "Aktif" },
    { name: "Ayşe Fit", role: "Premium", status: "Aktif" },
    { name: "Admin Kullanıcı", role: "Admin", status: "Aktif" },
    { name: "Mehmet Kaya", role: "Ücretsiz", status: "Pasif" },
  ];

  const metrics = [
    { name: "Adım Sayısı", value: "42%", width: "42%" },
    { name: "Su Tüketimi", value: "28%", width: "28%" },
    { name: "Uyku", value: "16%", width: "16%" },
    { name: "Kalori", value: "14%", width: "14%" },
  ];

  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 pb-24 lg:p-8">
          {/* HERO */}
          <section className="rounded-[28px] bg-gradient-to-r from-[#217ABF] to-[#011062] p-8 text-white shadow-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEC20D] text-[#011062]">
                  <Shield size={34} />
                </div>

                <h1 className="text-5xl font-extrabold text-white">
                  Yönetici Paneli
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white">
                  Kullanıcı istatistiklerini, metrik yoğunluğunu ve sistem
                  durumunu tek ekrandan takip et.
                </p>
              </div>

              <div className="rounded-3xl bg-white/20 px-10 py-7 text-center backdrop-blur-md">
                <p className="text-sm font-medium text-white">
                  Sistem Durumu
                </p>

                <p className="mt-3 text-5xl font-extrabold text-[#FEC20D]">
                  Aktif
                </p>

                <p className="mt-2 text-sm text-white">
                  Tüm servisler açık
                </p>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FF] text-[#217ABF]">
                    <Icon size={24} />
                  </div>

                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h3 className="mt-2 text-3xl font-bold text-[#011062]">
                    {item.value}
                  </h3>
                </div>
              );
            })}
          </section>

          {/* MAIN GRID */}
          <section className="mt-8 grid gap-6 xl:grid-cols-3">
            {/* USERS */}
            <div className="rounded-[28px] bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#011062]">
                    Kullanıcı Yönetimi
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Sisteme kayıtlı kullanıcıları görüntüle.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl bg-[#F5F7FA] px-4 py-3">
                  <Search size={18} className="text-gray-400" />

                  <input
                    placeholder="Kullanıcı ara..."
                    className="bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-100">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F5F7FA] text-[#011062]">
                    <tr>
                      <th className="px-5 py-4">Ad Soyad</th>
                      <th className="px-5 py-4">Rol</th>
                      <th className="px-5 py-4">Durum</th>
                      <th className="px-5 py-4 text-right">İşlem</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.name} className="border-t border-gray-100">
                        <td className="px-5 py-4 font-medium text-[#011062]">
                          {user.name}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {user.role}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              user.status === "Aktif"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button className="rounded-xl p-2 hover:bg-[#F5F7FA]">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* METRICS */}
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEC20D]/30 text-[#011062]">
                  <BarChart3 size={24} />
                </div>

                <h2 className="text-xl font-bold text-[#011062]">
                  En Çok Takip Edilen Metrikler
                </h2>

                <div className="mt-5 space-y-4">
                  {metrics.map((metric) => (
                    <div key={metric.name}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="text-gray-600">{metric.name}</span>

                        <span className="font-semibold text-[#011062]">
                          {metric.value}
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-[#F5F7FA]">
                        <div
                          className="h-full rounded-full bg-[#217ABF]"
                          style={{ width: metric.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="rounded-[28px] border-2 border-[#FEC20D] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEC20D]/30 text-[#011062]">
                  <Settings size={24} />
                </div>

                <h2 className="text-xl font-bold text-[#011062]">
                  Hızlı Yönetim
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Admin işlemlerini buradan hızlıca yönetebilirsin.
                </p>

                <div className="mt-5 space-y-3">
                  <button className="w-full rounded-xl bg-[#217ABF] px-4 py-3 font-semibold text-white hover:bg-[#011062]">
                    Kullanıcıları Gör
                  </button>

                  <button className="w-full rounded-xl bg-[#FEC20D] px-4 py-3 font-semibold text-[#011062]">
                    Metrik Ayarları
                  </button>

                  <button className="w-full rounded-xl bg-[#F5F7FA] px-4 py-3 font-semibold text-[#011062]">
                    Raporları Görüntüle
                  </button>
                </div>
              </div>

              {/* NOTIFICATION */}
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FF] text-[#217ABF]">
                  <Bell size={24} />
                </div>

                <h2 className="text-xl font-bold text-[#011062]">
                  Sistem Bildirimi
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Bugün 17 kullanıcı hedef tamamlama bildirimi aldı.
                </p>
              </div>
            </div>
          </section>
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}