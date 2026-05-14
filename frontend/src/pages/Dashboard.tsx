import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMetricModal from '../components/AddMetricModal';

const Dashboard: React.FC = () => {
  const [dailyData, setDailyData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDailyData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/metrics/daily/6bb020f4-7627-4416-b6d7-13b4a8ad9a7d');
      setDailyData(response.data);
    } catch (error) {
      console.error('Daily data could not be loaded:', error);
    }
  };

  useEffect(() => {
    fetchDailyData();
  }, []);

  const metrics = [
    {
      name: 'Steps',
      current: dailyData?.steps?.toLocaleString() || '0',
      target: '10,000',
      unit: 'steps',
      progress: Math.min(((dailyData?.steps || 0) / 10000) * 100, 100),
      status: (dailyData?.steps >= 10000) ? 'Complete' : 'Behind',
      icon: 'directions_walk',
    },
    {
      name: 'Water Intake',
      current: dailyData?.water?.toLocaleString() || '0',
      target: '2,500',
      unit: 'ml',
      progress: Math.min(((dailyData?.water || 0) / 2500) * 100, 100),
      status: 'Normal',
      icon: 'water_drop',
    },
    {
      name: 'Sleep',
      current: dailyData?.sleep || '0',
      target: '8',
      unit: 'hours',
      progress: Math.min(((dailyData?.sleep || 0) / 8) * 100, 100),
      status: 'Good',
      icon: 'bedtime',
    },
    {
      name: 'Weight',
      current: dailyData?.weight || '0',
      target: '',
      unit: 'kg',
      progress: 100,
      status: 'Stable',
      icon: 'monitor_weight',
    },
    {
      name: 'Heart Rate',
      current: dailyData?.heartRate || '0',
      target: '',
      unit: 'bpm',
      progress: 100,
      status: 'Normal',
      icon: 'favorite',
    },
    {
      name: 'Calories',
      current: dailyData?.calories?.toLocaleString() || '0',
      target: '2,000',
      unit: 'kcal',
      progress: Math.min(((dailyData?.calories || 0) / 2000) * 100, 100),
      status: 'Normal',
      icon: 'local_fire_department',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop pt-stack-md pb-stack-lg">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-gutter gap-stack-md">
        <div>
          <h1 className="text-headline-lg text-on-surface mb-stack-sm">Welcome back! Here's your health overview.</h1>
          <p className="text-on-surface-variant">Your progress looks good. Keep going!</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-semibold shadow-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add</span>
          Quick Entry
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-xl shadow-sm p-stack-md flex flex-col items-center justify-center relative overflow-hidden border border-surface-variant">
          <h2 className="text-title-lg text-on-surface mb-stack-lg">Health Score</h2>
          <div className="relative w-48 h-48 flex items-center justify-center z-10 mb-stack-md">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle className="text-surface-container-highest" cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
              <circle
                className="text-primary transition-all duration-1000"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * 82) / 100}
              />
            </svg>
            <div className="text-center">
              <span className="text-display-lg text-primary block">82</span>
              <span className="text-xs text-on-surface-variant">/ 100</span>
            </div>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            +5 from last week
          </div>
        </div>

        <div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-stack-md">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-surface-container-lowest rounded-xl shadow-sm p-stack-md border border-surface-variant flex flex-col">
              <div className="flex justify-between items-start mb-stack-sm">
                <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">{metric.icon}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline">{metric.status}</span>
              </div>
              <h3 className="text-sm text-on-surface-variant mb-1">{metric.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-xl font-bold text-on-surface">{metric.current}</span>
                <span className="text-xs text-outline">{metric.target ? `/ ${metric.target} ${metric.unit}` : metric.unit}</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-1.5 mt-auto">
                <div className="bg-primary h-1.5 rounded-full transition-all duration-500" style={{ width: `${metric.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddMetricModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => fetchDailyData()}
      />
    </div>
  );
};

export default Dashboard;
