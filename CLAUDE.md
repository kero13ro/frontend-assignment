# Food Order System

## Project Overview
A food ordering system built as a frontend interview assignment. Focuses on code quality, architecture, testing, and Git practices over visual polish.

## Tech Stack
- **Framework**: React 18 + TypeScript (Vite)
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **Testing**: Vitest + React Testing Library
- **Language**: TypeScript (strict mode)

## Project Structure
```
src/
  components/    # Reusable UI components
  features/      # Feature modules with Redux slices
    cart/        # Cart slice, components, tests
    menu/        # Menu components, tests
    history/     # Order history slice, components, tests
  data/          # Mock food data
  types/         # Shared TypeScript type definitions
  store/         # Redux store configuration
  App.tsx        # Root component with routing/layout
```

## Conventions
- Use functional components with hooks exclusively
- Use Redux Toolkit's createSlice for all state management
- Keep components small and focused (single responsibility)
- Co-locate tests with their source files (e.g., `CartItem.test.tsx` next to `CartItem.tsx`)
- Use named exports (not default exports) for components
- Type all props with interfaces, suffix with `Props` (e.g., `MenuItemProps`)
- Use MUI's `sx` prop for component-level styling, avoid inline styles

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run test` — Run tests with Vitest
- `npm run test:coverage` — Run tests with coverage report
- `npm run lint` — Run ESLint

## Git Practices
- Use conventional commits: `feat:`, `fix:`, `test:`, `refactor:`, `docs:`, `chore:`
- Keep commits atomic — one logical change per commit
- Write meaningful commit messages explaining "why" not "what"

## Testing Guidelines
- Test user behavior, not implementation details
- Use React Testing Library's queries (getByRole, getByText) over test IDs
- Focus on: state changes, user interactions, edge cases (empty cart, zero quantity, etc.)
- Mock data should be defined in test files, not imported from app data
