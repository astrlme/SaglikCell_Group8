import { useState, useEffect } from "react";
import {
  Activity,
  Droplet,
  Flame,
  Footprints,
  Heart,
  Moon,
  Plus,
  Scale,
  TrendingUp,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNavbar from "../components/BottomNavbar";
import { MetricService, type MetricResponse } from "../services/MetricService";
import { ProfileService, type ProfileResponse } from "../services/ProfileService";
import { GoalService, type GoalResponse } from "../services/GoalService";

export default function Dashboard() {
  const [apiMetrics, setApiMetrics] = useState<MetricResponse[]>([]);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [goals, setGoals] = useState<GoalResponse[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        let data = await MetricService.getMetrics();
        
        // Demo amaçlı: Eğer kullanıcının hiç verisi yoksa, backend'e örnek veriler ekleyelim
        if (data.length === 0) {
          const today = new Date().toISOString().split('T')[0];
          await Promise.all([
            MetricService.addMetric({ type: 0, value: 8450, date: today }),
            MetricService.addMetric({ type: 1, value: 1750, date: today }),
            MetricService.addMetric({ type: 2, value: 7.2, date: today }),
            MetricService.addMetric({ type: 3, value: 74, date: today }),
            MetricService.addMetric({ type: 4, value: 78, date: today }),
            MetricService.addMetric({ type: 5, value: 1950, date: today })
          ]);
          data = await MetricService.getMetrics();
        }
        
        setApiMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics", error);
      }

      try {
        const profileData = await ProfileService.getProfile();
        setProfile(profileData);
      } catch (e) {
        console.error("Error fetching profile", e);
      }

      try {
        const goalsData = await GoalService.getGoals();
        setGoals(goalsData);
      } catch (e) {
        console.error("Error fetching goals", e);
      }
    };
    fetchMetrics();
  }, []);

  const getMetricValue = (type: number, fallback: string) => {
    const metric = apiMetrics.find((m) => m.type === type);
    return metric ? metric.value.toString() : fallback;
  };
  const metrics = [
    {
      title: "Adım Sayısı",
      value: getMetricValue(0, "0"), // 0: STEPS
      target: "10.000 adım",
      percent: 84,
      status: "Hedefe Yakın",
      icon: Footprints,
    },
    {
      title: "Su Tüketimi",
      value: getMetricValue(1, "0"), // 1: WATER
      target: "2.500 ml",
      percent: 70,
      status: "Normal",
      icon: Droplet,
    },
    {
      title: "Uyku",
      value: getMetricValue(2, "0"), // 2: SLEEP
      target: "8 saat",
      percent: 90,
      status: "İyi",
      icon: Moon,
    },
    {
      title: "Kilo",
      value: getMetricValue(3, "0"), // 3: WEIGHT
      target: "kg",
      percent: 100,
      status: "Stabil",
      icon: Scale,
    },
    {
      title: "Kalp Atışı",
      value: getMetricValue(4, "0"), // 4: HEART_RATE
      target: "bpm",
      percent: 78,
      status: "Normal",
      icon: Heart,
    },
    {
      title: "Kalori",
      value: getMetricValue(5, "0"), // 5: CALORIES
      target: "2.200 kcal",
      percent: 88,
      status: "Normal",
      icon: Flame,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#EAF6FF]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 pb-24 lg:p-8">
          <section 
            className="rounded-[28px] p-8 text-white shadow-xl"
            style={{ background: 'linear-gradient(to right, #217ABF, #011062)' }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEC20D] text-[#011062]">
                  <Activity size={34} />
                </div>

                <h1 className="text-5xl font-extrabold text-white">
                  Merhaba {profile?.fullName?.split(" ")[0] || "Kullanıcı"} 👋
                </h1>

                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white">
                  Bugünkü sağlık durumunu, hedef ilerlemeni ve günlük
                  metriklerini buradan takip et.
                </p>
              </div>

              <div className="rounded-3xl bg-white/20 px-10 py-7 text-center backdrop-blur-md">
                <p className="text-sm font-medium text-white">Sağlık Skoru</p>

                <p className="mt-3 text-5xl font-extrabold text-[#FEC20D]">
                  82
                </p>

                <p className="mt-2 text-sm text-white">/ 100</p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                  <TrendingUp size={16} />
                  +5 geçen haftaya göre
                </div>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.title}
                  className="rounded-[28px] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6FF] text-[#217ABF]">
                      <Icon size={24} />
                    </div>

                    <span className="rounded-full bg-[#FEC20D]/25 px-3 py-1 text-xs font-bold text-[#011062]">
                      {metric.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">{metric.title}</p>

                  <div className="mt-2 flex items-end gap-2">
                    <h3 className="text-3xl font-bold text-[#011062]">
                      {metric.value}
                    </h3>

                    <span className="mb-1 text-sm text-gray-500">
                      / {metric.target}
                    </span>
                  </div>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#F5F7FA]">
                    <div
                      className="h-full rounded-full bg-[#217ABF]"
                      style={{ width: `${metric.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-3">
            <div className="rounded-[28px] bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#011062]">
                    Günlük Hedef İlerlemesi
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Hedeflerine ulaşmak için harika gidiyorsun.
                  </p>
                </div>

                <button className="hidden rounded-xl bg-[#217ABF] px-4 py-3 font-semibold text-white hover:bg-[#011062] md:flex md:items-center md:gap-2">
                  <Plus size={18} />
                  Hızlı Giriş
                </button>
              </div>

              {goals.length > 0 ? (
                goals.slice(0, 2).map((goal) => {
                  const metricNames = ["Adım", "Su", "Uyku", "Kilo", "Kalp Atışı", "Kalori"];
                  const metricName = metricNames[goal.metricType] || "Metrik";
                  const currentValueStr = getMetricValue(goal.metricType, "0");
                  const currentValue = parseFloat(currentValueStr.replace(/\./g, ''));
                  const percent = Math.min(100, Math.round((currentValue / goal.targetValue) * 100)) || 0;
                  const remaining = Math.max(0, goal.targetValue - currentValue);

                  return (
                    <div key={goal.id} className="rounded-3xl bg-[#F5F7FA] p-6 mb-4">
                      <div className="mb-3 flex justify-between">
                        <span className="font-semibold text-[#011062]">
                          Günlük {metricName} Hedefi
                        </span>
                        <span className="font-bold text-[#217ABF]">
                          {goal.currentStreak} gün streak 🔥
                        </span>
                      </div>

                      <div className="h-4 overflow-hidden rounded-full bg-white">
                        <div className="h-full rounded-full bg-[#FEC20D]" style={{ width: `${percent}%` }} />
                      </div>

                      <p className="mt-3 text-sm text-gray-500">
                        Hedefinin %{percent}’ini tamamladın. {remaining} {metricName.toLowerCase()} kaldı.
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-3xl bg-[#F5F7FA] p-6">
                  <div className="mb-3 flex justify-between">
                    <span className="font-semibold text-[#011062]">
                      Günlük Adım Hedefi
                    </span>
                    <span className="font-bold text-[#217ABF]">
                      0 gün streak 🔥
                    </span>
                  </div>

                  <div className="h-4 overflow-hidden rounded-full bg-white">
                    <div className="h-full w-[84%] rounded-full bg-[#FEC20D]" />
                  </div>

                  <p className="mt-3 text-sm text-gray-500">
                    Henüz aktif bir hedefiniz bulunmuyor. Yeni hedefler belirleyin!
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-[28px] border-2 border-[#FEC20D] bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#011062]">
                Son Bildirimler
              </h2>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-[#EAF6FF] p-4 text-sm text-[#011062]">
                  Su hedefinin %70’ine ulaştın.
                </div>

                <div className="rounded-2xl bg-[#FEC20D]/25 p-4 text-sm text-[#011062]">
                  Bugünkü uyku verin normal aralıkta.
                </div>

                <div className="rounded-2xl bg-green-100 p-4 text-sm text-green-700">
                  Harika gidiyorsun! Adım hedefin çok yakın.
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