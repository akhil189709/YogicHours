export interface HealthIntakeRecord {
    id: string;
    userId?: string;
    name: string;
    email: string;
    phone?: string;
    healthProblems: string[];
    stressLevel: number;
    bpHistory: string;
    goals: string[];
    lifestyleHabits: {
        sleepHours: number;
        exerciseFrequency: string;
        diet: string;
        waterIntake: number;
    };
    additionalNotes: string;
    fileName?: string;
    filePath?: string;
    createdAt: string;
}

export interface BlogPostRecord {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    published: boolean;
    createdAt: string;
}

export interface ServiceRecord {
    id: string;
    name: string;
    description: string;
}

export interface InstructorRecord {
    id: string;
    name: string;
    title: string;
    specialties: string[];
}

export const healthIntakes: HealthIntakeRecord[] = [];

export const blogPosts: BlogPostRecord[] = [
    {
        slug: 'stress-relief-yoga',
        title: 'Yoga for Stress Relief',
        excerpt: 'Breathing practices and mindful movement to lower anxiety and help you relax.',
        content:
            'Gentle practices that focus on relaxation, breath awareness, and releasing tension. Ideal for busy schedules and anxious minds.',
        category: 'therapy_yoga',
        author: 'Maya Patel',
        published: true,
        createdAt: new Date('2026-04-01T08:00:00.000Z').toISOString(),
    },
    {
        slug: 'home-yoga-routine',
        title: 'Building a Home Practice',
        excerpt: 'Simple routines to keep yoga consistent, even when your schedule is full.',
        content:
            'Set a consistent schedule, choose supportive space, and layer short sessions over time. Quality movement with intention is better than long, unfocused practice.',
        category: 'yoga_tips',
        author: 'Arjun Mehra',
        published: true,
        createdAt: new Date('2026-04-15T10:00:00.000Z').toISOString(),
    },
    {
        slug: 'mindful-eating',
        title: 'Mindful Eating Habits',
        excerpt: 'Nutrition guidance that supports steady energy and mental clarity.',
        content:
            'Slow down meals, honor your hunger signals, and choose nourishing foods. Mindful eating supports digestion, energy levels, and emotional balance.',
        category: 'diet_wellness',
        author: 'Sana Reddy',
        published: true,
        createdAt: new Date('2026-04-28T12:00:00.000Z').toISOString(),
    },
];

export const serviceList: ServiceRecord[] = [
    {
        id: 'service-01',
        name: 'Therapy Yoga',
        description: 'Personalized yoga plans for injury recovery, posture correction, and pain relief.',
    },
    {
        id: 'service-02',
        name: 'Yoga at Home',
        description: 'Guided home sessions designed to fit your daily life and pace.',
    },
    {
        id: 'service-03',
        name: 'Online 1-on-1 Classes',
        description: 'Private sessions to refine alignment, breathwork, and mindset.',
    },
    {
        id: 'service-04',
        name: 'Corporate Wellness',
        description: 'Programs for teams to reduce stress and build resilience.',
    },
];

export const instructors: InstructorRecord[] = [
    {
        id: 'instructor-01',
        name: 'Maya Patel',
        title: 'Senior Yoga Therapist',
        specialties: ['Therapy Yoga', 'Breathwork'],
    },
    {
        id: 'instructor-02',
        name: 'Arjun Mehra',
        title: 'Mindfulness Coach',
        specialties: ['Meditation', 'Corporate Wellness'],
    },
    {
        id: 'instructor-03',
        name: 'Sana Reddy',
        title: 'Family Wellness Expert',
        specialties: ['Family Yoga', 'Couples Yoga'],
    },
];
