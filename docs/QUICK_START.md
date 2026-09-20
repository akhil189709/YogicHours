# Quick Start Guide - Yogic Hours

Get up and running with Yogic Hours in minutes!

## 🚀 5-Minute Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

```bash
cp .env.example .env.local
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open Browser

Navigate to `http://localhost:3000` ✨

---

## 📂 Project Structure Overview

```
src/
  ├── app/           # Next.js pages and API routes
  ├── components/    # React components (organized by feature)
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  ├── constants/     # Application constants
  ├── services/      # External API integrations
  ├── hooks/         # Custom React hooks
  ├── context/       # React Context providers
  └── styles/        # Global CSS
```

## 🛠️ Common Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Check code quality
npm run format       # Format code automatically
npm run type-check   # Check TypeScript types
```

## 📝 Creating Your First Component

**Create a new button component:**

```bash
mkdir -p src/components/MyFeature
touch src/components/MyFeature/MyButton.tsx
touch src/components/MyFeature/index.ts
```

**MyButton.tsx:**

```typescript
import React from 'react';

interface MyButtonProps {
  label: string;
  onClick: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      {label}
    </button>
  );
};

export default MyButton;
```

**index.ts:**

```typescript
export { default as MyButton } from './MyButton';
```

## 🔌 Adding an API Endpoint

**Create new endpoint:**

```bash
mkdir -p src/app/api/myendpoint
touch src/app/api/myendpoint/route.ts
```

**route.ts:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createApiResponse } from '@/utils/api';

export async function GET(request: NextRequest) {
  try {
    // Your logic
    return NextResponse.json(createApiResponse(true, { message: 'Success' }), { status: 200 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, null, 'Error message'), { status: 500 });
  }
}
```

## 💾 Using Environment Variables

**Add to `.env.local`:**

```
MY_VARIABLE=value
NEXT_PUBLIC_VISIBLE_VARIABLE=visible_value
```

**Use in code:**

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const secret = process.env.MY_SECRET_VARIABLE;
```

## 📚 Imports with Path Aliases

```typescript
// ✅ Use these
import { Button } from '@/components/Common';
import { calculateBMI } from '@/utils/wellness';
import { API_ENDPOINTS } from '@/constants';
import type { User } from '@/types';

// ❌ Avoid these
import { Button } from '../../../components/Common';
```

## 🎨 Styling with Tailwind

```typescript
// Use Tailwind classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold text-gray-800">Title</h1>
  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Action
  </button>
</div>
```

## 🔍 Debugging Tips

### View API Response

Use browser DevTools Network tab to inspect API calls.

### TypeScript Errors

```bash
npm run type-check
```

### Formatting Issues

```bash
npm run format
```

## 📖 Documentation

- [README.md](./README.md) - Full project overview
- [docs/PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md) - Detailed folder structure
- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Complete dev guide
- [docs/API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) - API reference
- [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) - Contribution guidelines

## ⚡ Pro Tips

1. **Use TypeScript strict mode** - Catch bugs early
2. **Path aliases** - Keep imports clean and refactoring easy
3. **Component library** - Reuse Common components
4. **Constants file** - Single source of truth for config
5. **API response format** - Use `createApiResponse()` for consistency

## 🆘 Troubleshooting

### Port 3000 in use?

```bash
npm run dev -- -p 3001
```

### Clear cache and reinstall

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Can't find module?

- Check path alias in `tsconfig.json`
- Verify file exists
- Restart dev server

## 📞 Need Help?

- Check [docs](./docs) folder
- Review existing code patterns
- Ask team members
- Open an issue

---

**That's it! Happy coding! 🧘‍♀️✨**

Start exploring the project and happy development!
