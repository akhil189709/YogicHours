'use client';

import { useState } from 'react';
import { getBPStatus, getHeartRateZone } from '@/utils/wellness';

const STATUS_STYLES: Record<string, string> = {
  Normal: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Elevated: 'bg-amber-50 text-amber-700 border-amber-200',
  'High Blood Pressure Stage 1': 'bg-orange-50 text-orange-700 border-orange-200',
  'High Blood Pressure Stage 2': 'bg-rose-50 text-rose-700 border-rose-200',
  'Crisis (Emergency Care Needed)': 'bg-red-100 text-red-800 border-red-300',
};

const BPAnalyzer = () => {
  const [systolic, setSystolic] = useState('120');
  const [diastolic, setDiastolic] = useState('80');
  const [heartRate, setHeartRate] = useState('72');
  const [age, setAge] = useState('30');
  const [result, setResult] = useState<{ status: string; zone: string } | null>(null);

  const analyze = () => {
    const sys = Number(systolic);
    const dia = Number(diastolic);
    const hr = Number(heartRate);
    const userAge = Number(age);
    if (!sys || !dia) return;
    setResult({
      status: getBPStatus(sys, dia),
      zone: hr && userAge ? getHeartRateZone(hr, userAge) : '—',
    });
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#143024]">BP &amp; Heart Rate Analyzer</h3>
      <p className="mt-2 text-sm text-[#143024]/60">
        Measure your cardiovascular status with a quick wellness summary.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Systolic (mmHg)</span>
          <input
            type="number"
            value={systolic}
            onChange={(event) => setSystolic(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Diastolic (mmHg)</span>
          <input
            type="number"
            value={diastolic}
            onChange={(event) => setDiastolic(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Heart Rate (bpm)</span>
          <input
            type="number"
            value={heartRate}
            onChange={(event) => setHeartRate(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Age</span>
          <input
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
      </div>
      <button
        onClick={analyze}
        className="mt-6 rounded-full bg-[#143024] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#be9227]"
      >
        Analyze Vitals
      </button>
      {result && (
        <div
          className={`mt-6 rounded-2xl border px-6 py-5 ${STATUS_STYLES[result.status] ?? 'bg-[#143024]/5 text-[#143024] border-[#143024]/10'}`}
        >
          <p className="text-lg font-bold">{result.status}</p>
          <p className="mt-1 text-sm opacity-80">Heart rate zone: {result.zone}</p>
        </div>
      )}
    </div>
  );
};

export default BPAnalyzer;
