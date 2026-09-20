// Services Types
export interface Service {
    id: string;
    name: string;
    description: string;
    category: ServiceCategory;
    price?: number;
    duration?: number;
    image?: string;
}

export type ServiceCategory =
    | 'online_group'
    | 'personal_transformation'
    | 'therapy_yoga'
    | 'corporate_wellness';

// Health Intake Form Types
export interface HealthIntakeForm {
    id: string;
    healthProblems: string[];
    stressLevel: number; // 1-10
    bpHistory?: string;
    goals: string[];
    lifestyleHabits: LifestyleHabits;
    fileUpload?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LifestyleHabits {
    sleepHours: number;
    exerciseFrequency: string;
    diet: string;
    waterIntake: number;
}

// Wellness Tools Types
export interface BMIData {
    height: number; // in cm
    weight: number; // in kg
    bmi: number;
    category: string;
}

export interface HealthVitals {
    heartRate: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    timestamp: Date;
}

export interface WaterIntakeLog {
    date: Date;
    amount: number; // in ml
}

export interface BreathingSession {
    duration: number; // in seconds
    breaths: number;
    capacity: number; // percentage
}

// Surya Namaskar Types
export interface SuryaNamaskarSession {
    id: string;
    userId: string;
    totalRounds: number;
    caloriesBurned: number;
    duration: number; // in minutes
    speed: 'slow' | 'normal' | 'fast';
    mantras: boolean;
    voiceGuidance: boolean;
    createdAt: Date;
}

// Meditation Types
export interface MeditationSession {
    id: string;
    userId: string;
    type: MeditationType;
    soundscapeType?: SoundscapeType;
    duration: number; // in minutes
    createdAt: Date;
}

export type MeditationType = 'free' | 'guided_savasana';
export type SoundscapeType = 'rain' | 'ocean' | 'forest' | 'tibetan_bowl';

// Blog Types
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: BlogCategory;
    author: string;
    coverImage?: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
}

export type BlogCategory = 'yoga_tips' | 'meditation' | 'therapy_yoga' | 'breathwork' | 'diet_wellness';

// Inquiry Types
export interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'new' | 'responded' | 'closed';
    createdAt: Date;
    respondedAt?: Date;
}

// Instructor Types
export interface Instructor {
    id: string;
    userId: string;
    specializations: string[];
    experience: number; // years
    certifications: string[];
    bio: string;
    photo?: string;
    rating: number;
    reviews: Review[];
}

export interface Review {
    id: string;
    instructorId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    statusCode: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
