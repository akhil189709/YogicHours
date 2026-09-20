'use client';

import { useState } from 'react';
import { calculateBMI, getBMICategory } from '@/utils/wellness';

const CATEGORY_STYLES: Record<string, string> = {
  Underweight: 'bg-sky-50 text-sky-700 border-sky-200',
  'Normal weight': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Overweight: 'bg-amber-50 text-amber-700 border-amber-200',
  Obese: 'bg-rose-50 text-rose-700 border-rose-200',
};

const BMICalculator = () => {
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('65');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBmi = () => {
    const cm = Number(height);
    const kg = Number(weight);
    if (!cm || !kg) return;
    const bmiValue = calculateBMI(cm, kg);
    setBmi(bmiValue);
    setCategory(getBMICategory(bmiValue));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#143024]">BMI Calculator</h3>
      <p className="mt-2 text-sm text-[#143024]/60">
        Enter your height and weight to assess your body mass index.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Height (cm)</span>
          <input
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-[#143024]/80">
          <span>Weight (kg)</span>
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="w-full rounded-2xl border border-[#143024]/15 px-4 py-3 focus:border-[#be9227] focus:ring-2 focus:ring-[#be9227]/20"
          />
        </label>
      </div>
      <button
        onClick={calculateBmi}
        className="mt-6 rounded-full bg-[#143024] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#be9227]"
      >
        Calculate BMI
      </button>
      {bmi !== null && (
        <div
          className={`mt-6 flex items-center justify-between rounded-2xl border px-6 py-5 ${CATEGORY_STYLES[category] ?? 'bg-[#143024]/5 text-[#143024] border-[#143024]/10'}`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
              Your BMI
            </p>
            <p className="text-3xl font-bold">{bmi}</p>
          </div>
          <p className="text-sm font-semibold">{category}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
