import {
  Bell,
  CheckCircle,
  Clock,
  Droplet,
  Moon,
  Target,
  Trash2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

export default function Notifications() {
  const notifications = [
    {
      title: "Su içme zamanı",
      desc: "Günlük su hedefinin %70’ine ulaştın. Bir bardak daha içebilirsin.",
      time: "5 dk önce",
      icon: Droplet,
      type: "info",
    },
    {
      title: "Hedefe yaklaştın",
      desc: "Adım hedefinin %84’ünü tamamladın. Harika gidiyorsun!",
      time: "22 dk önce",
      icon: Target,
      type: "success",
    },
    {
      title: "Uyku verisi hatırlatması",
      desc: "Bugünkü uyku süreni girmeyi unutma.",
      time: "1 saat önce",
      icon: Moon,
      type: "warning",
    },
    {
      title: "Hedef tamamlandı",
      desc: "3 gün üst üste adım hedefini tamamladın. Yeni rozet kazandın!",
      time: "Dün",
      icon: CheckCircle,
      type: "success",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 pb-24 lg:p-8">
          <section className="rounded-[28px] p-8 text-white shadow-xl"
            style={{ background: 'linear-gradient(to right, #217ABF, #011062)' }}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEC20D] text-[#011062]">
                  <Bell size={34} />
                </div>

                <h1 className="text-5xl font-extrabold text-white">
                  Bildirimler
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white">
                  Su içme, veri girişi ve hedef ilerleme hatırlatmalarını buradan takip et.
                </p>
              </div>

              <div className="rounded-3xl bg-white/20 px-10 py-7 text-center backdrop-blur-md">
                <p className="text-sm font-medium text-white">Okunmamış</p>
                <p className="mt-3 text-5xl font-extrabold text-[#FEC20D]">3</p>
                <p className="mt-2 text-sm text-white">Yeni bildirim</p>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-[28px] bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#011062]">
                    Son Bildirimler
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Güncel sağlık hatırlatmaların.
                  </p>
                </div>

                <button className="rounded-xl bg-[#FEC20D] px-4 py-3 font-semibold text-[#011062]">
                  Tümünü Okundu Yap
                </button>
              </div>

              <div className="space-y-4">
                {notifications.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-3xl border border-gray-100 bg-[#F5F7FA] p-5"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.type === "success"
                            ? "bg-green-100 text-green-700"
                            : item.type === "warning"
                              ? "bg-[#FEC20D]/30 text-[#011062]"
                              : "bg-[#EAF6FF] text-[#217ABF]"
                          }`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-[#011062]">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {item.desc}
                            </p>
                          </div>

                          <button className="rounded-xl p-2 text-gray-400 hover:bg-white hover:text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={14} />
                          {item.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border-2 border-[#FEC20D] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#011062]">
                  Bildirim Ayarları
                </h2>

                <div className="mt-5 space-y-4">
                  {[
                    "Su içme hatırlatması",
                    "Günlük veri girişi",
                    "Hedef %80 bildirimi",
                    "Rozet kazanımı",
                  ].map((item) => (
                    <label
                      key={item}
                      className="flex items-center justify-between rounded-2xl bg-[#F5F7FA] p-4"
                    >
                      <span className="text-sm font-medium text-[#011062]">
                        {item}
                      </span>
                      <input type="checkbox" defaultChecked />
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#011062]">
                  Hatırlatma Özeti
                </h2>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl bg-[#EAF6FF] p-4">
                    <p className="text-sm text-gray-500">Bugün gönderilen</p>
                    <p className="mt-1 text-2xl font-bold text-[#217ABF]">12</p>
                  </div>

                  <div className="rounded-2xl bg-[#FEC20D]/25 p-4">
                    <p className="text-sm text-gray-500">Hedef bildirimleri</p>
                    <p className="mt-1 text-2xl font-bold text-[#011062]">5</p>
                  </div>

                  <div className="rounded-2xl bg-green-100 p-4">
                    <p className="text-sm text-gray-500">Tamamlanan hedef</p>
                    <p className="mt-1 text-2xl font-bold text-green-700">3</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}