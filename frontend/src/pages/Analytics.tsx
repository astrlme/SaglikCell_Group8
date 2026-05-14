import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";

const weeklyData = [
  { day: "Pzt", steps: 7200, water: 1800, sleep: 7.1, calories: 1900 },
  { day: "Sal", steps: 8500, water: 2100, sleep: 7.5, calories: 2050 },
  { day: "Çar", steps: 6400, water: 1700, sleep: 6.8, calories: 1850 },
  { day: "Per", steps: 9800, water: 2400, sleep: 8.1, calories: 2200 },
  { day: "Cum", steps: 10400, water: 2600, sleep: 7.9, calories: 2300 },
  { day: "Cmt", steps: 7800, water: 2000, sleep: 8.4, calories: 2100 },
  { day: "Paz", steps: 9200, water: 2300, sleep: 7.6, calories: 2150 },
];

const monthlyData = [
  { week: "1. Hafta", steps: 62000, water: 14500 },
  { week: "2. Hafta", steps: 70500, water: 15800 },
  { week: "3. Hafta", steps: 68200, water: 15100 },
  { week: "4. Hafta", steps: 74800, water: 16500 },
];

const pieData = [
  { name: "Adım", value: 35 },
  { name: "Su", value: 25 },
  { name: "Uyku", value: 20 },
  { name: "Kalori", value: 20 },
];

const colors = ["#217ABF", "#FEC20D", "#011062", "#22C55E"];

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 pb-24 lg:pb-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#011062]">
              Sağlık Analizleri
            </h1>
            <p className="mt-2 text-gray-500">
              Haftalık ve aylık sağlık trendlerini buradan takip edebilirsin.
            </p>
          </div>

          <section className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Bu Hafta</p>
              <h3 className="mt-2 text-2xl font-bold text-[#217ABF]">
                59.3K
              </h3>
              <p className="mt-1 text-sm text-green-600">+14% artış</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Su Ortalaması</p>
              <h3 className="mt-2 text-2xl font-bold text-[#217ABF]">
                2.1L
              </h3>
              <p className="mt-1 text-sm text-green-600">Hedefe yakın</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">Uyku Ortalaması</p>
              <h3 className="mt-2 text-2xl font-bold text-[#217ABF]">
                7.6s
              </h3>
              <p className="mt-1 text-sm text-green-600">Normal</p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">BMI</p>
              <h3 className="mt-2 text-2xl font-bold text-[#217ABF]">
                23.4
              </h3>
              <p className="mt-1 text-sm text-green-600">Normal aralık</p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#011062]">
                Haftalık Adım Trendi
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="steps"
                      stroke="#217ABF"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#011062]">
                Aylık Su & Adım Karşılaştırması
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#217ABF" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="water" fill="#FEC20D" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#011062]">
                Metrik Dağılımı
              </h2>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={70}
                      outerRadius={110}
                      paddingAngle={5}
                    >
                      {pieData.map((_, index) => (
                        <Cell key={index} fill={colors[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: colors[index] }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name}: %{item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#011062]">
                En İyi / En Düşük Günler
              </h2>

              <div className="space-y-4">
                <div className="rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-gray-500">En iyi gün</p>
                  <h3 className="mt-1 text-xl font-bold text-green-700">
                    Cuma — 10.400 adım
                  </h3>
                </div>

                <div className="rounded-2xl bg-orange-50 p-4">
                  <p className="text-sm text-gray-500">En düşük gün</p>
                  <h3 className="mt-1 text-xl font-bold text-orange-700">
                    Çarşamba — 6.400 adım
                  </h3>
                </div>

                <div className="rounded-2xl bg-[#EAF6FF] p-4">
                  <p className="text-sm text-gray-500">Öneri</p>
                  <h3 className="mt-1 font-semibold text-[#011062]">
                    Su tüketimini günlük 2.5L seviyesine yaklaştırırsan haftalık
                    hedef tamamlanır.
                  </h3>
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