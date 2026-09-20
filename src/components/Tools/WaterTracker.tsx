'use client';

import { useMemo, useState } from 'react';
import { getWaterIntakeRecommendation } from '@/utils/wellness';

const GLASS_ML = 250;

const WaterTracker = () => {
  const [weight, setWeight] = useState('65');
  const [glasses, setGlasses] = useState(8);

  const goalMl = useMemo(() => {
    const weightValue = Number(weight);
    if (!weightValue) return 2000;
    return Math.round(getWaterIntakeRecommendation(weightValue));
  }, [weight]);

  const goalGlasses = Math.max(6, Math.round(goalMl / GLASS_ML));
  const progress = Math.min(100, Math.round(((glasses * GLASS_ML) / goalMl) * 100));

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#143024]">Water Intake Tracker</h3>
      <p className="mt-2 text-sm text-[#143024]/60">
        Set a hydration goal based on your weight and track daily glasses (250ml each).
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Weight (kg)</span>
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Glasses consumed today</span>
          <input
            type="range"
            min="0"
            max="16"
            value={glasses}
            onChange={(event) => setGlasses(Number(event.target.value))}
            className="w-full accent-[#be9227]"
          />
          <p className="text-sm text-[#143024]/60">{glasses} glasses</p>
        </label>
      </div>
      <div className="mt-6 rounded-2xl border border-[#143024]/10 bg-[#143024]/[0.03] p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#143024]">
            Daily goal: {goalGlasses} glasses ({(goalMl / 1000).toFixed(1)}L)
          </p>
          <p className="text-sm font-bold text-[#be9227]">{progress}%</p>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-[#143024]/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#be9227] to-[#d4af37] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
