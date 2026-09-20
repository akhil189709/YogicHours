// API Endpoints
export const API_ENDPOINTS = {
    HEALTH_INTAKE: {
        CREATE: '/api/health-intake',
        GET: '/api/health-intake',
        UPDATE: '/api/health-intake',
    },
    BLOG: {
        LIST: '/api/blog',
        GET: (slug: string) => `/api/blog/${slug}`,
    },
};

// Service Categories
export const SERVICE_CATEGORIES = {
    ONLINE_GROUP: 'online_group',
    PERSONAL_TRANSFORMATION: 'personal_transformation',
    THERAPY_YOGA: 'therapy_yoga',
    CORPORATE_WELLNESS: 'corporate_wellness',
};

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
    online_group: 'Online Group Wellness Classes',
    personal_transformation: 'Personal Transformation Classes',
    therapy_yoga: 'Therapy Yoga Programs',
    corporate_wellness: 'Corporate Wellness Programs',
};

// Social Media Links
export const SOCIAL_MEDIA = {
    INSTAGRAM: { handle: '@yogichours', url: 'https://instagram.com/yogichours' },
    FACEBOOK: { handle: 'Yogic Hours', url: 'https://facebook.com/yogichours' },
    YOUTUBE: { handle: 'Yogic Hours', url: 'https://youtube.com/@yogichours' },
    LINKEDIN: { handle: 'Yogic Hours', url: 'https://linkedin.com/company/yogichours' },
};

// The single number the whole site uses: bookings, WhatsApp and general enquiries all go here.
// Change it in this one place — everything below is derived from it.
const PRIMARY_PHONE = { display: '+91 95577 29533', digits: '919557729533' };

// Contact Information
export const CONTACT_INFO = {
    EMAIL: 'contact@yogichours.com',
    PHONE: PRIMARY_PHONE.display,
    PHONE_LINK: `tel:+${PRIMARY_PHONE.digits}`,
    WHATSAPP: PRIMARY_PHONE.display,
    WHATSAPP_LINK: `https://wa.me/${PRIMARY_PHONE.digits}`,
    WEBSITE: 'https://yogichours.com',
};

// Meditation Types & Soundscapes
export const MEDITATION_TYPES = {
    FREE: 'free',
    GUIDED_SAVASANA: 'guided_savasana',
};

export const SOUNDSCAPE_TYPES = {
    RAIN: 'rain',
    OCEAN: 'ocean',
    FOREST: 'forest',
    TIBETAN_BOWL: 'tibetan_bowl',
};

// Blog Categories
export const BLOG_CATEGORIES = {
    YOGA_TIPS: 'yoga_tips',
    MEDITATION: 'meditation',
    THERAPY_YOGA: 'therapy_yoga',
    BREATHWORK: 'breathwork',
    DIET_WELLNESS: 'diet_wellness',
};

export const BLOG_CATEGORY_LABELS: Record<string, string> = {
    yoga_tips: 'Yoga Tips',
    meditation: 'Meditation',
    therapy_yoga: 'Therapy Yoga',
    breathwork: 'Breathwork',
    diet_wellness: 'Diet & Wellness',
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
};

// Validation
export const VALIDATION = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^(\+91[\-\s]?)?[0-9]{10}$/,
    PASSWORD_MIN_LENGTH: 8,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
};

// Surya Namaskar
export const SURYA_NAMASKAR = {
    TOTAL_POSES: 12,
    SPEEDS: {
        SLOW: 'slow',
        NORMAL: 'normal',
        FAST: 'fast',
    },
    POSES: [
        'Pranamasana (Prayer Pose)',
        'Hastauttanasana (Raised Arms Pose)',
        'Hastapadasana (Standing Forward Bend)',
        'Ashwasanchalanasana (Equestrian Pose)',
        'Dandasana (Stick Pose)',
        'Ashtanga Namaskara (Eight-Limbed Salutation)',
        'Bhujangasana (Cobra Pose)',
        'Adho Mukha Svanasana (Downward-Facing Dog)',
        'Ashwasanchalanasana (Equestrian Pose)',
        'Hastapadasana (Standing Forward Bend)',
        'Hastauttanasana (Raised Arms Pose)',
        'Pranamasana (Prayer Pose)',
    ],
};

// BMI Categories
export const BMI_CATEGORIES = {
    UNDERWEIGHT: 'Underweight',
    NORMAL: 'Normal weight',
    OVERWEIGHT: 'Overweight',
    OBESE: 'Obese',
};

// Health Stress Levels
export const STRESS_LEVELS = [
    { value: 1, label: 'Very Low' },
    { value: 2, label: 'Low' },
    { value: 3, label: 'Moderate' },
    { value: 4, label: 'High' },
    { value: 5, label: 'Very High' },
];

// Common Health Problems
export const COMMON_HEALTH_PROBLEMS = [
    'Back Pain',
    'Neck Pain',
    'Arthritis',
    'Anxiety',
    'Depression',
    'Insomnia',
    'High Blood Pressure',
    'Diabetes',
    'Asthma',
    'Stress',
    'Fatigue',
    'Migraine',
];

// Wellness Goals (Health Intake Form)
export const WELLNESS_GOALS = [
    'Stress Relief',
    'Weight Management',
    'Flexibility & Mobility',
    'Strength Building',
    'Pain Relief',
    'Better Sleep',
    'Injury Recovery',
    'Improved Focus',
    'Cardiovascular Health',
    'Prenatal / Postnatal Care',
    'General Wellbeing',
];

// Lifestyle Habit Options (Health Intake Form)
export const EXERCISE_FREQUENCIES = [
    'Sedentary (little to no exercise)',
    '1-2 times per week',
    '3-4 times per week',
    '5+ times per week',
    'Daily',
];

export const DIET_TYPES = [
    'Vegetarian',
    'Non-Vegetarian',
    'Vegan',
    'Eggetarian',
    'Jain',
    'Other',
];
