import React, { useState } from 'react';
import axios from 'axios';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddMetricModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [type, setType] = useState('WATER');
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/metrics', {
        userId: '6bb020f4-7627-4416-b6d7-13b4a8ad9a7d',
        metricType: type,
        value: Number(value),
        recordedDate: new Date().toISOString()
      });
      onSuccess();
      onClose();
    } catch (error) {
      alert("Veri kaydedilemedi!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-container-lowest rounded-2xl p-stack-lg w-full max-w-md shadow-2xl border border-surface-variant">
        <h2 className="text-title-lg mb-gutter">Hızlı Veri Girişi</h2>
        <form onSubmit={handleSubmit} className="space-y-stack-md">
          <div>
            <label className="block text-sm font-medium mb-stack-sm text-on-surface-variant">Metrik Tipi</label>
            <select 
              className="w-full p-3 rounded-lg border border-outline bg-transparent"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="WATER">Su (ml)</option>
              <option value="STEPS">Adım (adet)</option>
              <option value="CALORIES">Kalori (kcal)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-stack-sm text-on-surface-variant">Miktar</label>
            <input 
              type="number" 
              className="w-full p-3 rounded-lg border border-outline bg-transparent"
              placeholder="Örn: 200"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-stack-md pt-stack-md">
            <button type="button" onClick={onClose} className="flex-1 py-3 text-primary font-bold">İptal</button>
            <button type="submit" className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-bold">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMetricModal;