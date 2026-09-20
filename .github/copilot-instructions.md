# Yogic Hours - Project Guidelines for Contributors

## Project Overview

Yogic Hours is a premium Next.js-based wellness and yoga platform. All code must follow TypeScript strict mode, use the established folder structure, and maintain consistency with existing patterns.

## Code Style & Standards

### TypeScript

- Strict mode enabled
- All functions must have type annotations
- Use interfaces for object shapes
- Avoid `any` type
- Define all types in `src/types/index.ts`

### Components

- Functional components with TypeScript
- Use `React.FC<Props>` or `React.forwardRef` for forwarded refs
- Place PropTypes interfaces in the same file
- Use PascalCase for component names
- Add `displayName` for components

### API Routes

- Use `createApiResponse()` for consistent responses
- Validate inputs with clear error messages
- Always include status codes
- Handle errors gracefully
- Follow RESTful conventions

### File Organization

- Place reusable functions in `src/utils/`
- Constants go in `src/constants/index.ts`
- Types in `src/types/index.ts`
- Services in `src/services/` for external integrations
- Components organized by feature in `src/components/`

### Path Aliases

Always use path aliases for imports:

```typescript
import { Button } from '@/components/Common';
import { calculateBMI } from '@/utils/wellness';
import { API_ENDPOINTS } from '@/constants';
import type { User } from '@/types';
```

## Commit & PR Guidelines

### Commit Messages

Follow conventional commits:

```
feat(auth): add JWT token refresh
fix(booking): correct date validation
docs(api): update endpoint documentation
```

### PR Requirements

- Clear PR title and description
- Include screenshots for UI changes
- Reference related issues
- Run linting and type checking locally
- Ensure all tests pass

## Code Quality

Before committing:

```bash
npm run lint
npm run format
npm run type-check
```

## Folder Structure Rules

- Features are organized by domain (auth, booking, wellness, etc.)
- Components grouped by page/section
- Utilities and services separated by concern
- Keep nesting shallow (max 3-4 levels)
- Use index files for clean imports

## Naming Conventions

- Files: PascalCase (components), camelCase (utilities)
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

## Testing & Documentation

- Add JSDoc comments to public functions
- Update README/docs for significant changes
- Include examples for complex features
- Maintain inline comments for complex logic only

## Key Resources

- [README.md](../README.md) - Project overview
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed folder structure
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development setup & workflow
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API endpoints
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines

## Common Tasks

### Add New Component

1. Create folder in appropriate `src/components/` category
2. Create component file with TypeScript types
3. Create index.ts for exports
4. Add to parent index file if needed

### Add New API Endpoint

1. Create route file in `src/app/api/`
2. Use `createApiResponse()` for responses
3. Add error handling
4. Document in API_DOCUMENTATION.md

### Add New Type

1. Edit `src/types/index.ts`
2. Export from index
3. Use in components/API routes

### Add New Utility

1. Create file in `src/utils/`
2. Export functions with TypeScript types
3. Add JSDoc comments
4. Import with path alias

## Important Points

- Never commit secrets or API keys
- Use environment variables for configuration
- Always validate inputs on the server
- Keep components small and focused
- Reuse components from `src/components/Common/`
- Follow the project's TypeScript and style rules
- Ask questions before implementing complex features

---

**For questions, refer to the documentation in `/docs` folder or reach out to the team.**
