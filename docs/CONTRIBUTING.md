# Contributing to Yogic Hours

Thank you for your interest in contributing to Yogic Hours! We're excited to have you join our team. Please read the following guidelines to ensure smooth collaboration.

## Code of Conduct

- Be respectful and inclusive
- Help others learn and grow
- Report issues professionally
- Focus on constructive feedback

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/yogic-hours.git`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Commit with clear messages: `git commit -m "Add: description"`
6. Push to your fork: `git push origin feature/your-feature`
7. Create a Pull Request

## Development Setup

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed setup instructions.

## Code Standards

### TypeScript

- Use strict mode
- Always type function parameters and returns
- Avoid `any` type
- Use interfaces for object shapes

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = (id: string): Promise<User> => {
  // implementation
};

// ❌ Avoid
const getUser = (id) => {
  // implementation
};
```

### Components

- Use functional components
- Use React.memo for expensive components
- Add PropTypes or TypeScript interfaces
- Write descriptive display names

```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary'
}) => {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
```

### API Routes

- Validate input with Zod
- Use consistent response format
- Handle errors properly
- Return appropriate status codes

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    // Process
    // Respond

    return NextResponse.json(createApiResponse(true, data), { status: 200 });
  } catch (error) {
    return NextResponse.json(createApiResponse(false, null, error.message), { status: 500 });
  }
}
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types/Interfaces**: PascalCase
- **CSS Classes**: kebab-case

```typescript
// Components
Button.tsx;
UserProfile.tsx;

// Utilities
calculateBMI.ts;
formatDate.ts;

// Constants
API_ENDPOINTS;
MAX_USERS;

// Types
interface User {}
type Status = 'pending' | 'active';
```

### Comments

- Use comments for complex logic only
- Keep comments up to date
- Use JSDoc for public functions

```typescript
/**
 * Calculate Body Mass Index
 * @param height - Height in centimeters
 * @param weight - Weight in kilograms
 * @returns BMI value rounded to 2 decimal places
 */
export const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 100) / 100;
};
```

## Commit Messages

Follow conventional commits:

```
type(scope): subject

body

footer
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Dependencies, config, etc.

### Examples

```
feat(auth): add JWT token refresh
fix(booking): correct date validation
docs(api): update endpoint documentation
refactor(components): extract common styles
```

## Pull Request Process

1. **Before submitting:**
   - Run `npm run lint`
   - Run `npm run format`
   - Run `npm run type-check`
   - Test your changes thoroughly

2. **PR Title:**
   - Be clear and descriptive
   - Example: "Add BMI Calculator component"

3. **PR Description:**

   ```markdown
   ## Description

   Brief description of changes

   ## Type of Change

   - [ ] New feature
   - [ ] Bug fix
   - [ ] Documentation
   - [ ] Breaking change

   ## How to Test

   Steps to test the changes

   ## Screenshots (if applicable)

   Add screenshots for UI changes

   ## Checklist

   - [ ] Code follows project standards
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

4. **Code Review:**
   - Address feedback promptly
   - Be open to suggestions
   - Ask questions if unclear

## Testing

### Writing Tests

```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Running Tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

## Documentation

- Update README.md for significant changes
- Add JSDoc comments to functions
- Update API documentation for new endpoints
- Include examples where helpful

## Issues

### Before Creating an Issue

- Search existing issues
- Check documentation
- Try to reproduce locally

### Creating an Issue

Include:

- Clear title and description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## Feature Requests

- Clearly describe the feature
- Explain the use case
- Provide examples if possible
- Be open to feedback and discussion

## Code Review Checklist

When reviewing code:

- [ ] Code follows project standards
- [ ] Types are properly defined
- [ ] No hardcoded values
- [ ] Error handling is adequate
- [ ] Performance is acceptable
- [ ] Documentation is updated
- [ ] Tests are included
- [ ] No console.log statements
- [ ] No commented-out code

## Performance Guidelines

- Use React.memo for expensive components
- Implement code splitting for large components
- Optimize images and assets
- Monitor bundle size
- Avoid unnecessary re-renders

## Accessibility

- Use semantic HTML
- Add alt text to images
- Ensure keyboard navigation
- Use proper ARIA labels
- Check color contrast ratios

## Security

- Never commit secrets or API keys
- Use environment variables
- Validate all inputs server-side
- Sanitize user data
- Keep dependencies updated
- Follow OWASP guidelines

## Git Best Practices

```bash
# Keep branch updated
git fetch origin
git rebase origin/main

# Squash commits
git rebase -i HEAD~n

# Push with force (use with caution)
git push --force-with-lease

# Keep commits clean
git commit --amend
```

## Questions or Need Help?

- Open a discussion on GitHub
- Ask in team Slack/Discord
- Check existing documentation
- Reach out to maintainers

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project README

---

Thank you for contributing to Yogic Hours! Together, we're making wellness accessible to everyone.

**Happy Contributing! 🧘‍♀️✨**
