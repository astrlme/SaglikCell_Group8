import { Crown, CheckCircle, CreditCard, XCircle } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

export default function Premium() {
  const [cardNumber, setCardNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleUpgrade = () => {
    if (cardNumber.startsWith("4242")) {
      setMessage("Premium üyelik başarıyla aktif edildi ✅");
    } else if (cardNumber.startsWith("4000")) {
      setMessage("Paycell ödeme başarısız ❌");
    } else {
      setMessage("Demo için 4242 veya 4000 ile başlayan kart gir.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 pb-24 lg:pb-6">
          <section
            className="rounded-[28px] p-8 text-white shadow-xl"
            style={{ background: 'linear-gradient(to right, #217ABF, #011062)' }}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEC20D] text-[#011062]">
                  <Crown size={30} />
                </div>

                <h1 className="text-4xl font-bold">SağlıkCell Premium</h1>
                <p className="mt-3 max-w-2xl text-white/80">
                  Detaylı analizler, sınırsız hedef oluşturma ve kişiselleştirilmiş
                  sağlık önerileriyle hedeflerine daha hızlı ulaş.
                </p>
              </div>

              <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur">
                <p className="text-sm text-white/80">Aylık Paket</p>
                <p className="mt-2 text-4xl font-bold">₺49,99</p>
                <p className="mt-1 text-sm text-white/70">Paycell ile ödeme</p>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#011062]">
                Premium Özellikler
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  "Sınırsız hedef oluşturma",
                  "Detaylı haftalık ve aylık analizler",
                  "Trend karşılaştırma",
                  "Kişisel koçluk önerileri",
                  "Sağlık raporu export",
                  "Paycell abonelik yönetimi",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#011062]">
                Ücretsiz Plan
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  "Günlük veri girişi",
                  "Temel dashboard",
                  "Basit grafikler",
                  "1 aktif hedef",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="text-[#217ABF]" size={20} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}

                {["Sınırsız hedef", "Detaylı analitik", "Rapor export"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <XCircle className="text-red-400" size={20} />
                      <span className="text-sm text-gray-400">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="rounded-3xl border-2 border-[#FEC20D] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEC20D]/30 text-[#011062]">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#011062]">
                    Paycell Ödeme
                  </h2>
                  <p className="text-sm text-gray-500">Demo ödeme simülasyonu</p>
                </div>
              </div>

              <label className="mb-2 block text-sm font-medium text-gray-600">
                Kart Numarası
              </label>

              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#217ABF]"
              />

              <div className="mt-3 rounded-2xl bg-[#F5F7FA] p-4 text-sm text-gray-600">
                <p>
                  Başarılı ödeme: <b>4242</b> ile başlayan kart
                </p>
                <p>
                  Başarısız ödeme: <b>4000</b> ile başlayan kart
                </p>
              </div>

              <button
                onClick={handleUpgrade}
                className="mt-5 w-full rounded-xl bg-[#FEC20D] px-4 py-3 font-bold text-[#011062] transition hover:scale-[1.02]"
              >
                Paycell ile Premium’a Geç
              </button>

              {message && (
                <div className="mt-4 rounded-xl bg-[#EAF6FF] p-4 text-sm font-medium text-[#011062]">
                  {message}
                </div>
              )}
            </div>
          </section>
        </main>

        <BottomNavbar />
      </div>
    </div>
  );
}