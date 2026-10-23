# Yogic Hours - Heal In Every Hour

A premium Next.js-based wellness and yoga platform offering personalized classes, therapy yoga programs, meditation space, and interactive wellness tools.

## 🎯 Project Overview

**Yogic Hours** is a comprehensive digital platform designed to bring yoga and wellness to everyone. It provides:

- **Online Classes**: Group and personal transformation classes
- **Therapy Programs**: Specialized yoga for health conditions
- **Corporate Wellness**: Programs for organizations
- **Interactive Tools**: BMI calculator, breathing tests, water tracker, and more
- **Meditation Space**: Guided meditation with ambient sounds
- **Surya Namaskar Tracker**: Sun salutation practice with voice guidance
- **Blog**: SEO-optimized wellness content
- **Booking System**: Easy scheduling and management
- **Payment Integration**: Razorpay, UPI, QR payments

---

## 📁 Project Structure

```
yogic-hours/
├── .github/                          # GitHub configuration
│   └── copilot-instructions.md
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── auth/                 # Authentication endpoints
│   │   │   │   ├── login/route.ts
│   │   │   │   └── register/route.ts
│   │   │   ├── bookings/             # Booking management
│   │   │   ├── payments/             # Payment processing
│   │   │   ├── inquiries/            # Contact inquiries
│   │   │   ├── health-intake/        # Health forms
│   │   │   ├── blog/                 # Blog management
│   │   │   └── health/route.ts       # Health check endpoint
│   │   ├── layout.tsx                # Root layout with metadata
│   │   └── page.tsx                  # Home page
│   │
│   ├── components/                   # Reusable React components
│   │   ├── Common/                   # Shared components
│   │   │   ├── Header.tsx            # Navigation header
│   │   │   ├── Footer.tsx            # Footer component
│   │   │   ├── Button.tsx            # Reusable button
│   │   │   ├── Card.tsx              # Card wrapper
│   │   │   └── Container.tsx         # Layout container
│   │   ├── Home/                     # Home page sections
│   │   │   ├── HeroSection.tsx       # Hero banner
│   │   │   ├── AboutSection.tsx      # Brand story
│   │   │   ├── ServicesSection.tsx   # Service showcase
│   │   │   ├── InstructorsSection.tsx# Team profiles
│   │   │   ├── WhyChooseUs.tsx       # USP cards
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx        # Call-to-action
│   │   ├── WellnessTools/            # Interactive wellness tools
│   │   │   ├── BMICalculator.tsx
│   │   │   ├── BPHeartRateAnalyzer.tsx
│   │   │   ├── WaterIntakeTracker.tsx
│   │   │   ├── RunningTimer.tsx
│   │   │   ├── BreathingCapacityTest.tsx
│   │   │   └── PranayamaTimer.tsx
│   │   ├── MeditationSpace/          # Meditation components
│   │   │   ├── MeditationPlayer.tsx
│   │   │   ├── SoundscapeSelector.tsx
│   │   │   ├── MeditationTimer.tsx
│   │   │   ├── BreathingVisuals.tsx
│   │   │   └── GuidedSavasana.tsx
│   │   ├── SuryaNamaskar/            # Sun salutation tracker
│   │   │   ├── SuryaNamaskarTracker.tsx
│   │   │   ├── PoseCounter.tsx
│   │   │   ├── SpeedAdjuster.tsx
│   │   │   ├── VoiceGuidance.tsx
│   │   │   └── FullscreenMode.tsx
│   │   ├── Forms/                    # Form components
│   │   │   ├── HealthIntakeForm.tsx
│   │   │   ├── ConsultationForm.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   └── InquiryForm.tsx
│   │   └── Blog/                     # Blog components
│   │       ├── BlogCard.tsx
│   │       ├── BlogList.tsx
│   │       └── BlogDetail.tsx
│   │
│   ├── lib/                          # Utility libraries
│   │   ├── axios.ts                  # Axios instance with interceptors
│   │   └── validators.ts             # Schema validation
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useBooking.ts
│   │   ├── usePayment.ts
│   │   └── useWellness.ts
│   │
│   ├── context/                      # React Context providers
│   │   ├── AuthContext.tsx           # Authentication state
│   │   ├── BookingContext.tsx        # Booking state
│   │   └── UIContext.tsx             # UI state
│   │
│   ├── types/                        # TypeScript type definitions
│   │   ├── index.ts                  # All types exported here
│   │
│   ├── services/                     # External API services
│   │   ├── payment/
│   │   │   ├── razorpay.ts          # Razorpay integration
│   │   │   └── upi.ts               # UPI payment handler
│   │   ├── notification/
│   │   │   ├── email.ts             # Email service
│   │   │   ├── sms.ts               # SMS service
│   │   │   └── whatsapp.ts          # WhatsApp integration
│   │   └── booking/
│   │       ├── calendar.ts          # Calendar management
│   │       └── scheduler.ts         # Booking scheduler
│   │
│   ├── utils/                        # Utility functions
│   │   ├── api.ts                   # API helpers and error handling
│   │   ├── wellness.ts              # Wellness calculations (BMI, etc.)
│   │   ├── helpers.ts               # General helpers
│   │   └── validators.ts            # Input validation
│   │
│   ├── constants/                    # Application constants
│   │   ├── index.ts                 # API endpoints, categories, etc.
│   │
│   ├── middleware/                   # Next.js middleware
│   │   ├── auth.ts                  # Authentication middleware
│   │   └── cors.ts                  # CORS middleware
│   │
│   └── styles/                       # Global styles
│       └── globals.css               # Tailwind + custom styles
│
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   ├── sounds/                       # Meditation audio files
│   └── videos/
│
├── docs/                             # Project documentation
│   ├── ARCHITECTURE.md               # Architecture overview
│   ├── API_DOCUMENTATION.md          # API endpoints
│   ├── DEVELOPMENT.md                # Dev setup guide
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── CONTRIBUTING.md               # Contribution guidelines
│
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── postcss.config.js                 # PostCSS configuration
├── .eslintrc.json                    # ESLint rules
├── .prettierrc                        # Code formatting rules
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
└── README.md                         # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/yogic-hours.git
   cd yogic-hours
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your configuration:

   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   JWT_SECRET=your_secret_key
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   # ... other variables
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

---

## 🛠️ Technology Stack

### Frontend

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand/Context API
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: JWT
- **Database**: (Configure as needed - MongoDB, PostgreSQL, etc.)

### Services & Integrations

- **Payments**: Razorpay (UPI, Card, QR)
- **Email**: Nodemailer/SendGrid
- **SMS/WhatsApp**: Twilio
- **Authentication**: JWT, bcryptjs

### Development Tools

- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: npm/yarn

---

## 🏗️ Folder Organization Guidelines

### Component Development

Each component should follow this structure:

```typescript
// components/Common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', ...props }, ref) => {
    // Implementation
  }
);

Button.displayName = 'Button';
export default Button;
```

### API Route Development

```typescript
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    // Business logic
    // Response

    return NextResponse.json(createApiResponse(true, data, undefined, 200), { status: 200 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, undefined, error.message, 500), {
      status: 500,
    });
  }
}
```

### Type Definitions

Always add types to `src/types/index.ts`:

```typescript
// src/types/index.ts
export interface YourType {
  id: string;
  name: string;
  // ...
}
```

---

## 🔧 Configuration

### TypeScript Path Aliases

Pre-configured aliases in `tsconfig.json`:

```typescript
import { Button } from '@/components/Common';
import { calculateBMI } from '@/utils/wellness';
import { API_ENDPOINTS } from '@/constants';
import type { User } from '@/types';
```

### Environment Variables

Create `.env.local`:

```
# Database
DATABASE_URL=

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d

# Payment - Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Email Service
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# WhatsApp - Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

---

## 📚 Key Features Implementation Guide

### 1. Authentication

- Use `AuthContext` for global auth state
- JWT tokens stored in localStorage
- Interceptors handle token refresh

### 2. Forms

- Use React Hook Form + Zod validation
- Multi-step forms in `src/components/Forms`
- Consistent validation patterns

### 3. API Integration

- Base client in `src/lib/axios.ts`
- Service layer in `src/services`
- Error handling via `createApiResponse`

### 4. State Management

- Local state with `useState`
- Global state with Context API
- Optional: Add Zustand for complex state

### 5. Styling

- Tailwind CSS with custom config
- Global styles in `src/styles/globals.css`
- Component-scoped styles with `@apply`

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push branch: `git push origin feature/your-feature`
4. Open a Pull Request

### Code Standards

- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Add TypeScript types for all functions
- Include JSDoc comments for complex logic

---

## 📖 API Documentation

See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for detailed endpoint documentation.

### Key Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `POST /api/payments` - Process payment
- `GET /api/blog` - Fetch blog posts
- `POST /api/health-intake` - Submit health form

---

## 🔐 Security Considerations

- Never commit `.env.local`
- Use HTTPS in production
- Validate all inputs server-side
- Implement rate limiting on API
- Use CORS properly configured
- Keep dependencies updated

---

## 📱 Responsive Design

The project uses Tailwind CSS breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

---

## 🐛 Troubleshooting

### Port 3000 already in use

```bash
npm run dev -- -p 3001
```

### Clear Next.js cache

```bash
rm -rf .next
npm run dev
```

### Type errors

```bash
npm run type-check
```

---

## 📄 License

This project is proprietary and confidential.

---

## 👥 Team

**Yogic Hours** - Heal In Every Hour

- Website: https://yogichours.in
- Instagram: @yogichours
- Email: contact@yogichours.in

---

## 🙏 Acknowledgments

- Next.js documentation
- Tailwind CSS
- React community

---

## 📞 Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Email: contact@yogichours.in
- Visit: https://yogichours.in

---

**Happy Coding! 🧘‍♀️✨**
