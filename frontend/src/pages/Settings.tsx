import {
  Bell,
  Lock,
  Palette,
  Save,
  Settings as SettingsIcon,
  Shield,
  User,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 pb-24 lg:p-8">
          <section
            className="rounded-[28px] p-8 text-white shadow-xl"
            style={{ background: 'linear-gradient(to right, #217ABF, #011062)' }}>
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEC20D] text-[#011062]">
                <SettingsIcon size={34} />
              </div>

              <div>
                <h1 className="text-5xl font-extrabold">Ayarlar</h1>
                <p className="mt-3 text-lg text-white">
                  Profil, bildirim ve güvenlik tercihlerini yönet.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-[28px] bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <User className="text-[#217ABF]" />
                <h2 className="text-2xl font-bold text-[#011062]">
                  Profil Bilgileri
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#217ABF]"
                  placeholder="Ad Soyad"
                  defaultValue="Arif Emre"
                />

                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#217ABF]"
                  placeholder="GSM"
                  defaultValue="5321112233"
                />

                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#217ABF]"
                  placeholder="Boy"
                  defaultValue="178 cm"
                />

                <input
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#217ABF]"
                  placeholder="Kilo"
                  defaultValue="74 kg"
                />
              </div>

              <button className="mt-6 flex items-center gap-2 rounded-xl bg-[#217ABF] px-5 py-3 font-semibold text-white hover:bg-[#011062]">
                <Save size={18} />
                Değişiklikleri Kaydet
              </button>
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEC20D]/30 text-[#011062]">
                  <Bell size={24} />
                </div>

                <h2 className="text-xl font-bold text-[#011062]">
                  Bildirimler
                </h2>

                <div className="mt-5 space-y-4">
                  {["Su içme hatırlatması", "Günlük veri girişi", "Hedef bildirimi"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center justify-between rounded-2xl bg-[#F5F7FA] p-4"
                      >
                        <span className="text-sm font-medium text-[#011062]">
                          {item}
                        </span>
                        <input type="checkbox" defaultChecked />
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FF] text-[#217ABF]">
                  <Palette size={24} />
                </div>

                <h2 className="text-xl font-bold text-[#011062]">Tema</h2>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <button className="rounded-xl bg-[#217ABF] p-5" />
                  <button className="rounded-xl bg-[#FEC20D] p-5" />
                  <button className="rounded-xl bg-[#011062] p-5" />
                </div>
              </div>

              <div className="rounded-[28px] border-2 border-[#FEC20D] bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEC20D]/30 text-[#011062]">
                  <Shield size={24} />
                </div>

                <h2 className="text-xl font-bold text-[#011062]">
                  Güvenlik
                </h2>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5F7FA] px-4 py-3 font-semibold text-[#011062]">
                  <Lock size={18} />
                  Şifre / OTP Ayarları
                </button>
              </div>
            </div>
          </section>
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}