# Architecture Overview - Yogic Hours

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React Components (Next.js Pages & Components)       │   │
│  │  ├── Home Pages                                      │   │
│  │  ├── Wellness Tools                                 │   │
│  │  ├── Meditation Space                               │   │
│  │  ├── Surya Namaskar Tracker                          │   │
│  │  └── Forms (Booking, Health Intake, etc.)           │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  State Management (Context API / Zustand)           │   │
│  │  ├── AuthContext                                    │   │
│  │  ├── BookingContext                                 │   │
│  │  └── UIContext                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  HTTP Client (Axios with Interceptors)              │   │
│  │  ├── Request: Attach JWT tokens                     │   │
│  │  ├── Response: Handle errors & redirects            │   │
│  │  └── Interceptors: Auth validation                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP/API ↓
┌─────────────────────────────────────────────────────────────┐
│                   Server Layer (Backend)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes (Node.js)                        │   │
│  │  ├── Authentication (/api/auth)                     │   │
│  │  ├── Bookings (/api/bookings)                        │   │
│  │  ├── Payments (/api/payments)                        │   │
│  │  ├── Health Intake (/api/health-intake)             │   │
│  │  ├── Blog (/api/blog)                                │   │
│  │  └── Inquiries (/api/inquiries)                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic & Services                           │   │
│  │  ├── Payment Service (Razorpay)                     │   │
│  │  ├── Email Service (Nodemailer)                      │   │
│  │  ├── SMS/WhatsApp (Twilio)                           │   │
│  │  ├── Booking Manager                                │   │
│  │  └── User Manager                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Access & Database                              │   │
│  │  ├── ORM/Query Builder                               │   │
│  │  ├── Data Models                                    │   │
│  │  └── Migrations                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Database (MongoDB / PostgreSQL)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              External Integrations                           │
│  ├── Razorpay (Payments)                                    │
│  ├── Twilio (SMS/WhatsApp)                                  │
│  ├── Email Service (SendGrid/Nodemailer)                    │
│  ├── Cloud Storage (AWS S3/GCS) - Optional                  │
│  └── Analytics (Google Analytics/Mixpanel)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure & Responsibilities

### `/src/app`

**Next.js App Router - Route Handlers**

- Defines URL structure
- API route handlers
- Page components
- Layout configuration

### `/src/components`

**React UI Components - Organized by Feature**

- Common reusable components
- Page-specific sections
- Feature components (wellness tools, meditation, etc.)
- Form components

### `/src/types`

**TypeScript Type Definitions**

- User & Auth types
- Domain models (Service, Booking, Payment, etc.)
- Form data types
- API response types

### `/src/utils`

**Pure Utility Functions**

- API helpers and error handling
- Wellness calculations (BMI, calories, etc.)
- String formatting and validation
- General helper functions

### `/src/constants`

**Application-wide Constants**

- API endpoints
- Service categories
- Social media links
- Health problems, stress levels
- Meditation types, blog categories

### `/src/services`

**External Service Integrations**

- Payment processing (Razorpay, UPI)
- Email notifications
- SMS/WhatsApp (Twilio)
- Booking operations

### `/src/hooks`

**Custom React Hooks**

- Authentication logic
- Booking operations
- Payment handling
- Wellness tool logic

### `/src/context`

**Global State Management**

- Authentication state
- Booking state
- UI state (theme, notifications)

### `/src/lib`

**Pre-configured Libraries**

- Axios HTTP client with interceptors
- Validation schemas (Zod)
- Database connections

### `/src/middleware`

**Request/Response Middleware**

- Authentication middleware
- CORS configuration
- Error handling middleware

### `/src/styles`

**Global CSS & Tailwind**

- Global animations
- Custom utilities
- Theme configuration

---

## Data Flow

### 1. Authentication Flow

```
User Login
    ↓
API Route: /api/auth/login
    ↓
Validate credentials
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Store in localStorage
    ↓
Update AuthContext
    ↓
Redirect to dashboard
```

### 2. Booking Flow

```
User selects service
    ↓
Fill booking form
    ↓
POST /api/bookings
    ↓
Validate user & service
    ↓
Create booking record
    ↓
Return booking details
    ↓
Show confirmation
    ↓
Display payment options
```

### 3. Payment Flow

```
User selects payment method
    ↓
POST /api/payments
    ↓
Create Razorpay order
    ↓
Open payment gateway
    ↓
User completes payment
    ↓
Verify payment signature
    ↓
POST /payments/verify
    ↓
Update booking status
    ↓
Send confirmation email
```

### 4. Form Submission Flow

```
User fills health intake form
    ↓
Client-side validation (Zod)
    ↓
POST /api/health-intake
    ↓
Server-side validation
    ↓
Process file upload (if any)
    ↓
Save to database
    ↓
Send confirmation email
    ↓
Return success response
```

---

## Component Hierarchy

```
App (Root)
├── Header
│   ├── Navigation
│   └── User Menu
├── Main Content
│   ├── Hero Section
│   ├── Services Section
│   │   ├── ServiceCard
│   │   └── ServiceCard
│   ├── Wellness Tools Section
│   │   ├── BMICalculator
│   │   ├── WaterTracker
│   │   └── BreathingTest
│   ├── Meditation Space
│   │   ├── MeditationPlayer
│   │   ├── SoundscapeSelector
│   │   └── Timer
│   ├── SuryaNamaskar Tracker
│   │   ├── PoseCounter
│   │   ├── Timer
│   │   └── CaloriesTracker
│   ├── Blog Section
│   │   ├── BlogCard
│   │   └── BlogCard
│   └── Testimonials
├── Forms (Modal/Drawer)
│   ├── HealthIntakeForm
│   ├── BookingForm
│   └── InquiryForm
└── Footer
    ├── About
    ├── Links
    └── Social Media
```

---

## State Management Strategy

### Local State (Component Level)

- Form inputs
- UI toggles (modals, dropdowns)
- Component-specific data

```typescript
const [formData, setFormData] = useState({...});
const [isOpen, setIsOpen] = useState(false);
```

### Global State (Context API)

- User authentication
- Booking information
- UI theme/notifications

```typescript
const { user, isAuthenticated } = useAuth();
const { bookings } = useBooking();
```

### Server State (API)

- Fetched data (posts, services, etc.)
- Real-time updates

---

## Error Handling Strategy

### Client-side

```typescript
try {
  const response = await apiClient.post('/api/endpoint', data);
  // Handle success
} catch (error) {
  // Axios interceptor catches 401
  // Show toast notification
  // Log error for debugging
}
```

### Server-side

```typescript
export async function POST(request: NextRequest) {
  try {
    // Process request
    return NextResponse.json(createApiResponse(true, data), { status: 200 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, null, error.message), { status: 500 });
  }
}
```

### Consistent Response Format

```typescript
{
  success: boolean,
  data?: T,
  error?: string,
  message?: string,
  statusCode: number
}
```

---

## Security Considerations

### Authentication

- JWT tokens stored in localStorage
- Tokens included in Authorization header
- Interceptors handle token refresh
- 401 responses redirect to login

### API Security

- Input validation with Zod
- SQL injection prevention
- CORS properly configured
- Rate limiting on endpoints

### Data Protection

- Sensitive data in environment variables
- HTTPS in production
- Password hashing with bcryptjs
- Secure cookie settings

---

## Performance Optimization

### Code Splitting

- Next.js automatically splits by route
- Dynamic imports for heavy components
- Lazy loading for images

### Caching

- Browser caching for static assets
- API response caching
- Image optimization with next/image

### Database Optimization

- Proper indexing
- Query optimization
- Connection pooling

### Bundle Size

- Tree-shaking unused code
- Minification in production
- Image optimization

---

## Deployment Architecture

### Development

```
Local Machine
├── Next.js Dev Server (Port 3000)
├── Hot Module Reloading (HMR)
└── Local Database (MongoDB/PostgreSQL)
```

### Production

```
Cloud Provider (Vercel/AWS/GCP)
├── Next.js Server (Optimized Build)
├── API Routes (Serverless Functions)
├── Static Assets (CDN)
├── Database (Managed Service)
└── Environment Variables (Secrets Manager)
```

---

## Technology Stack

### Frontend

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Context API + Hooks
- **HTTP**: Axios
- **Forms**: React Hook Form + Zod

### Backend

- **Runtime**: Node.js
- **API**: Next.js Route Handlers
- **Auth**: JWT + bcryptjs
- **Emails**: Nodemailer/SendGrid
- **SMS**: Twilio

### Integrations

- **Payments**: Razorpay
- **Database**: MongoDB or PostgreSQL
- **File Storage**: AWS S3 or similar
- **Analytics**: Google Analytics

---

## Scalability Considerations

### Horizontal Scaling

- Stateless API design
- Database replication
- Load balancing
- CDN for static assets

### Vertical Scaling

- Optimize database queries
- Cache frequently accessed data
- Use pagination for large datasets
- Implement rate limiting

### Architecture Decisions

- Modular component structure
- Service-oriented backend
- Centralized state management
- Consistent error handling

---

## Monitoring & Logging

### What to Monitor

- API response times
- Error rates
- Database query performance
- User session metrics

### Logging Strategy

- Server-side logs for API
- Client-side error tracking
- Database query logs
- User action analytics

---

## Version Control & Deployment

### Git Workflow

- `main` branch for production
- `develop` branch for staging
- Feature branches for new features
- Pull requests for code review

### CI/CD Pipeline

- Automated linting & type checking
- Automated tests
- Build verification
- Automatic deployment to staging/production

---

## Future Enhancements

- Real-time features (WebSocket)
- Progressive Web App (PWA)
- Mobile app (React Native)
- Advanced analytics dashboard
- AI-powered recommendations
- Video streaming for classes
- Community features

---

**Last Updated**: 2024
**Project**: Yogic Hours - Heal In Every Hour
