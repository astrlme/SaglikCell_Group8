import { useState } from "react";
import { api } from "../services/api";

type MetricType =
  | "STEPS"
  | "WATER"
  | "SLEEP"
  | "WEIGHT"
  | "HEART_RATE"
  | "CALORIES";

type MetricData = {
  metricType: MetricType;
  value: number;
  recordedDate: string;
};

type Props = {
  onSubmit?: (data: MetricData) => void;
};

export default function QuickMetricForm({ onSubmit }: Props) {
  const [metricType, setMetricType] = useState<MetricType>("WATER");
  const [value, setValue] = useState<number>(250);
  const [recordedDate, setRecordedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      metricType,
      value,
      recordedDate,
    };

    const DEMO_USER_ID = "BURAYA_USER_ID_YAZ";

    try {
    await api.post(`/metrics/${DEMO_USER_ID}`, {
        metricType: data.metricType,
        value: data.value,
        recordedDate: data.recordedDate,
    });

    alert("Metrik başarıyla kaydedildi ✅");
    onSubmit?.(data);
    } catch (error) {
    console.error(error);
    alert("Metrik kaydedilemedi ❌");
    }
  };

  const quickAdd = (type: MetricType, amount: number) => {
    setMetricType(type);
    setValue(amount);
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#011062]">Hızlı Veri Girişi</h2>
        <p className="mt-1 text-sm text-gray-500">
          Günlük sağlık verini hızlıca ekle.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <button
          type="button"
          onClick={() => quickAdd("WATER", 250)}
          className="rounded-2xl bg-[#EAF6FF] px-4 py-3 text-sm font-semibold text-[#011062] transition hover:bg-[#d9efff]"
        >
          +250 ml Su
        </button>

        <button
          type="button"
          onClick={() => quickAdd("WATER", 200)}
          className="rounded-2xl bg-[#EAF6FF] px-4 py-3 text-sm font-semibold text-[#011062] transition hover:bg-[#d9efff]"
        >
          +1 Bardak
        </button>

        <button
          type="button"
          onClick={() => quickAdd("STEPS", 1000)}
          className="rounded-2xl bg-[#FEC20D]/30 px-4 py-3 text-sm font-semibold text-[#011062] transition hover:bg-[#FEC20D]/50"
        >
          +1000 Adım
        </button>

        <button
          type="button"
          onClick={() => quickAdd("CALORIES", 500)}
          className="rounded-2xl bg-[#F5F7FA] px-4 py-3 text-sm font-semibold text-[#011062] transition hover:bg-gray-200"
        >
          Öğün Ekle
        </button>
      </div>

      <form onSubmit={submitForm} className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Metrik
          </label>
          <select
            value={metricType}
            onChange={(e) => setMetricType(e.target.value as MetricType)}
            className="w-full rounded-xl border border-gray-200 px-3 py-3 outline-none focus:border-[#217ABF]"
          >
            <option value="STEPS">Adım Sayısı</option>
            <option value="WATER">Su Tüketimi</option>
            <option value="SLEEP">Uyku Süresi</option>
            <option value="WEIGHT">Kilo</option>
            <option value="HEART_RATE">Kalp Atış Hızı</option>
            <option value="CALORIES">Kalori Alımı</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Değer
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 px-3 py-3 outline-none focus:border-[#217ABF]"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Tarih
          </label>
          <input
            type="date"
            value={recordedDate}
            onChange={(e) => setRecordedDate(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-3 outline-none focus:border-[#217ABF]"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-xl bg-[#217ABF] px-4 py-3 font-semibold text-white transition hover:bg-[#011062]"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}