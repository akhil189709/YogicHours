# Development Guide - Yogic Hours

## Local Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or yarn 4.x
- Git
- Code editor (VS Code recommended)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/yogic-hours.git
   cd yogic-hours
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Configure .env.local**

   ```env
   # Application
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   NODE_ENV=development

   # JWT
   JWT_SECRET=dev_secret_key_change_in_production
   JWT_EXPIRY=7d

   # Database (configure as needed)
   DATABASE_URL=

   # Razorpay (get from dashboard)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret

   # Email Service
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM_EMAIL=noreply@yogichours.in

   # Twilio (for SMS/WhatsApp)
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. **Open browser**
   Navigate to `http://localhost:3000`

---

## Project Scripts

```bash
# Development
npm run dev              # Start dev server (with hot reload)

# Building
npm run build            # Create optimized production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types
npm run format           # Format code with Prettier
npm run format:check     # Check if code is formatted

# Testing (setup required)
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

---

## Development Workflow

### 1. Creating a New Component

```bash
mkdir -p src/components/MyComponent
touch src/components/MyComponent/MyComponent.tsx
touch src/components/MyComponent/index.ts
```

**MyComponent.tsx:**

```typescript
import React from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      {onClick && <button onClick={onClick}>Click me</button>}
    </div>
  );
};

export default MyComponent;
```

**index.ts:**

```typescript
export { default as MyComponent } from './MyComponent';
```

### 2. Creating an API Endpoint

```bash
mkdir -p src/app/api/my-endpoint
touch src/app/api/my-endpoint/route.ts
```

**route.ts:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json(createApiResponse(true, { data: 'result' }, undefined, 200), {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, undefined, error.message, 500), {
      status: 500,
    });
  }
}
```

### 3. Adding a New Type

Edit `src/types/index.ts`:

```typescript
export interface MyType {
  id: string;
  name: string;
  createdAt: Date;
}
```

### 4. Creating a Utility Function

**src/utils/myUtils.ts:**

```typescript
export const myUtility = (input: string): string => {
  return input.toUpperCase();
};

export const anotherUtility = (a: number, b: number): number => {
  return a + b;
};
```

### 5. Adding a Constant

Edit `src/constants/index.ts`:

```typescript
export const MY_CONSTANT = 'value';
export const MY_ENUM = {
  OPTION_1: 'option_1',
  OPTION_2: 'option_2',
};
```

---

## Debugging

### 1. VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

### 2. Browser DevTools

- Open Chrome/Firefox DevTools (F12)
- Use Console, Network, and React Developer Tools tabs

### 3. API Testing

Use Postman or REST Client VS Code extension:

```http
### Register User
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!@",
  "name": "Test User"
}

### Login User
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Test123!@"
}
```

---

## Code Style & Quality

### ESLint

```bash
# Fix linting errors
npm run lint -- --fix
```

### Prettier

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### TypeScript

```bash
# Check types
npm run type-check
```

---

## Common Tasks

### 1. Clear Cache

```bash
rm -rf .next
npm run dev
```

### 2. Update Dependencies

```bash
npm update
# or for specific package
npm update package-name
```

### 3. Add New Dependency

```bash
npm install package-name
# or dev dependency
npm install --save-dev package-name
```

### 4. View Component in Different Sizes

- Use browser DevTools device emulation
- Test with Chrome responsive design mode

---

## Database Setup (When Ready)

### With MongoDB

1. Create account on MongoDB Atlas
2. Create cluster
3. Get connection string
4. Add to `.env.local`:
   ```
   DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname
   ```

### With PostgreSQL

1. Install PostgreSQL locally or use cloud service
2. Create database
3. Add to `.env.local`:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dbname
   ```

---

## Testing (Optional Setup)

### Install Testing Libraries

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Create jest.config.js

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customJestConfig);
```

### Example Test

```typescript
// src/components/Common/Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## Performance Optimization

### 1. Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for above-the-fold
/>
```

### 2. Code Splitting

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <p>Loading...</p>,
});
```

### 3. Memoization

```typescript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

### 4. Monitor Build Size

```bash
npm run build
# Check output for bundle analysis
```

---

## Troubleshooting

### Port 3000 Already in Use

```bash
npm run dev -- -p 3001
```

### Node Modules Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Git Issues

```bash
# Reset to last commit
git reset --hard HEAD

# Check status
git status
```

### TypeScript Errors

```bash
npm run type-check
```

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Project Structure](./PROJECT_STRUCTURE.md)
- [API Documentation](./API_DOCUMENTATION.md)

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add: my-feature description"

# Push branch
git push origin feature/my-feature

# Create Pull Request on GitHub
```

---

## Getting Help

- Check documentation in `/docs`
- Review project issues on GitHub
- Ask team members in Slack/Discord
- Read code comments and TypeScript types

---

**Happy Coding! 🧘‍♀️✨**
