// BMI Calculation
export const calculateBMI = (heightInCm: number, weightInKg: number): number => {
    const heightInMeters = heightInCm / 100;
    return parseFloat((weightInKg / (heightInMeters * heightInMeters)).toFixed(2));
};

// Get BMI Category
export const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};

// Blood Pressure Status
export const getBPStatus = (systolic: number, diastolic: number): string => {
    if (systolic < 120 && diastolic < 80) return 'Normal';
    if (systolic < 130 && diastolic < 80) return 'Elevated';
    if (systolic < 140 && diastolic < 90) return 'High Blood Pressure Stage 1';
    if (systolic >= 140 && diastolic >= 90) return 'High Blood Pressure Stage 2';
    return 'Crisis (Emergency Care Needed)';
};

// Calculate calories burned in Surya Namaskar
export const calculateCaloriesBurned = (
    rounds: number,
    duration: number, // in minutes
    weight: number // in kg
): number => {
    // Approximate MET value for Surya Namaskar: 4.0
    const met = 4.0;
    const calories = (met * weight * duration) / 60;
    return Math.round(calories * rounds);
};

// Calculate water intake recommendation
export const getWaterIntakeRecommendation = (weight: number): number => {
    // General rule: 30-35ml per kg of body weight
    return weight * 30;
};

// Format heart rate zone
export const getHeartRateZone = (heartRate: number, age: number): string => {
    const maxHeartRate = 220 - age;
    const percentage = (heartRate / maxHeartRate) * 100;

    if (percentage < 50) return 'Rest Zone';
    if (percentage < 60) return 'Warm-up Zone';
    if (percentage < 70) return 'Fat Burn Zone';
    if (percentage < 80) return 'Cardio Zone';
    if (percentage < 90) return 'Peak Zone';
    return 'Maximum Zone';
};

// Calculate breathing capacity percentage
export const calculateBreathingCapacity = (breaths: number, duration: number): number => {
    const normalBreathsPerMinute = 12; // Normal resting breath rate
    const normalBreaths = (normalBreathsPerMinute / 60) * duration;
    const capacity = (breaths / normalBreaths) * 100;
    return Math.min(100, Math.round(capacity));
};

// Format time for display
export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0) parts.push(`${secs}s`);

    return parts.length ? parts.join(' ') : '0s';
};
