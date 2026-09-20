# Yogic Hours - Project Structure Documentation

## Overview

This document provides a comprehensive guide to the Yogic Hours project structure, designed to follow industry-level best practices for scalability, maintainability, and team collaboration.

## Directory Structure Explained

### `/src/app` - Next.js App Router

The main application layer using Next.js 14 App Router.

- **`api/`** - Backend API routes following RESTful conventions
  - Each resource (auth, bookings, payments, etc.) has its own folder
  - API routes use `route.ts` for handlers
  - Consistent error handling with `createApiResponse` utility

- **`layout.tsx`** - Root layout component
  - Global metadata configuration
  - Provider setup (Auth, UI, etc.)
  - Applies to all routes

- **`page.tsx`** - Home page
  - Landing page with hero section
  - Contains main page layout

### `/src/components` - Reusable Components

Organized by feature/section for easy navigation and maintenance.

**Common Components** (`/Common`)

- Shared across entire application
- Button, Card, Container, Header, Footer
- No business logic, purely presentational

**Feature Components**

- `Home/` - Landing page sections
- `WellnessTools/` - BMI calculator, breathing tests, water tracker
- `MeditationSpace/` - Meditation player, timers, soundscapes
- `SuryaNamaskar/` - Sun salutation practice tracker
- `Forms/` - Health intake, booking, inquiry forms
- `Blog/` - Blog listing and detail pages

### `/src/lib` - Utility Libraries

Pre-configured tools and configurations.

- **`axios.ts`** - Axios HTTP client with interceptors
  - Auto-attaches JWT tokens
  - Handles 401 responses
  - Centralized request/response handling

- **`validators.ts`** - Zod validation schemas
  - Reusable form validation
  - API input validation

### `/src/hooks` - Custom React Hooks

Encapsulated logic for components.

- `useAuth()` - Authentication state and methods
- `useBooking()` - Booking operations
- `usePayment()` - Payment processing
- `useWellness()` - Wellness calculations

### `/src/context` - React Context Providers

Global state management.

- `AuthContext` - User authentication state
- `BookingContext` - Booking state and operations
- `UIContext` - UI theme, notifications, etc.

### `/src/types` - TypeScript Definitions

**All types should be defined here** and exported.

Organized by domain:

- User types (User, AuthToken)
- Service types (Service, ServiceCategory)
- Booking types (Booking, BookingStatus)
- Payment types (Payment, PaymentStatus)
- Form types (HealthIntakeForm, LifestyleHabits)
- Tool types (BMIData, HealthVitals, WaterIntakeLog)
- Session types (MeditationSession, SuryaNamaskarSession)
- Blog types (BlogPost, BlogCategory)

### `/src/services` - External Service Integrations

Layer between app and external services.

**Payment Services** (`/payment`)

- Razorpay integration
- UPI payment handling

**Notification Services** (`/notification`)

- Email service (Nodemailer/SendGrid)
- SMS service (Twilio)
- WhatsApp integration (Twilio)

**Booking Services** (`/booking`)

- Calendar management
- Scheduling logic

### `/src/utils` - Utility Functions

Pure functions for common operations.

- **`api.ts`** - API response formatting, error handling
- **`wellness.ts`** - Health calculations (BMI, BP, calories, etc.)
- **`helpers.ts`** - General utilities (formatting, validation, etc.)
- **`validators.ts`** - Input validation functions

### `/src/constants` - Application Constants

**Single source of truth** for configuration values.

- API endpoints
- Service categories
- Social media links
- Contact information
- Meditation types and soundscapes
- Blog categories
- Payment methods
- Health problems list

### `/src/styles` - Global Styling

Tailwind CSS with custom configurations.

- `globals.css` - Global styles, animations, utility classes

### `/public` - Static Assets

Files served directly without processing.

- `/images` - Product images, logos, etc.
- `/icons` - SVG icons
- `/sounds` - Meditation audio files
- `/videos` - Promotional videos

### `/docs` - Project Documentation

Developer guides and references.

- `ARCHITECTURE.md` - System architecture overview
- `API_DOCUMENTATION.md` - API endpoint reference
- `DEVELOPMENT.md` - Local development setup
- `DEPLOYMENT.md` - Production deployment guide
- `CONTRIBUTING.md` - Contribution guidelines

### Configuration Files

- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration with path aliases
- **`next.config.js`** - Next.js configuration
- **`tailwind.config.js`** - Tailwind CSS customization
- **`postcss.config.js`** - CSS processing
- **`.eslintrc.json`** - Linting rules
- **`.prettierrc`** - Code formatting rules
- **`.env.example`** - Environment variables template
- **`.gitignore`** - Git ignore rules

## Best Practices

### 1. File Naming

- Components: PascalCase (`Button.tsx`, `BMICalculator.tsx`)
- Utilities: camelCase (`api.ts`, `wellness.ts`)
- Types/Interfaces: PascalCase (`User`, `Service`)

### 2. Folder Structure

- Feature-based organization for scalability
- Avoid deep nesting (max 3-4 levels)
- Related files grouped together
- Index files for cleaner imports

### 3. Imports

```typescript
// Use path aliases
import { Button } from '@/components/Common';
import { calculateBMI } from '@/utils/wellness';
import { API_ENDPOINTS } from '@/constants';
import type { User } from '@/types';

// Avoid relative paths
// ❌ import { Button } from '../../../components/Common';
```

### 4. TypeScript

- Always type function parameters and returns
- Use interfaces for object shapes
- Export types from `src/types/index.ts`
- Avoid `any` type

```typescript
// ✅ Good
interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button = ({ onClick, label }: ButtonProps) => (
  <button onClick={onClick}>{label}</button>
);
```

### 5. Component Structure

```typescript
// ✅ Good component structure
import React from 'react';
import type { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // Component-specific props
}

const Component: React.FC<Props> = ({ ...props }) => {
  // Hooks
  // State
  // Effects
  // Event handlers
  // Render
  return <div>Component</div>;
};

export default Component;
```

### 6. API Routes

- Use consistent response format (`createApiResponse`)
- Validate inputs with Zod schemas
- Implement proper error handling
- Use middleware for auth checks
- Return appropriate HTTP status codes

```typescript
// ✅ Good API route
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    // Process
    // Respond

    return NextResponse.json(createApiResponse(true, data, undefined, 200), { status: 200 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, undefined, 'Error message', 500), {
      status: 500,
    });
  }
}
```

### 7. Error Handling

- Use consistent error responses
- Log errors appropriately
- Show user-friendly messages
- Include error codes for debugging

### 8. State Management

- Use Context API for global state
- Keep state close to where it's used
- Avoid prop drilling with context
- Consider Zustand for complex state

## Adding New Features

### 1. Add New Page

```bash
mkdir -p src/app/new-page
touch src/app/new-page/page.tsx
touch src/app/new-page/layout.tsx
```

### 2. Add New Component

```bash
mkdir -p src/components/NewComponent
touch src/components/NewComponent/NewComponent.tsx
touch src/components/NewComponent/index.ts
```

### 3. Add New API Endpoint

```bash
mkdir -p src/app/api/new-endpoint
touch src/app/api/new-endpoint/route.ts
```

### 4. Add New Type

Edit `src/types/index.ts` and add your type.

### 5. Add New Utility

```bash
touch src/utils/new-utility.ts
```

## Performance Considerations

1. **Code Splitting** - Next.js automatically code-splits per route
2. **Image Optimization** - Use `next/image` for images
3. **Component Memoization** - Use `React.memo()` for expensive components
4. **Lazy Loading** - Use `dynamic()` for heavy components
5. **State Management** - Keep state as local as possible

## Scalability

- Folder structure supports growth
- Modular components easy to extend
- Service layer abstracts external integrations
- Type system prevents runtime errors
- Consistent patterns across codebase

## Team Collaboration

- Clear folder organization
- Type safety prevents bugs
- Consistent code style (ESLint + Prettier)
- Self-documenting code with types
- Centralized configuration (constants)
- Easy onboarding for new developers

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Project README](../README.md)

---

**Last Updated**: 2024
**Project**: Yogic Hours - Heal In Every Hour
