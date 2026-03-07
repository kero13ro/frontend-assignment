# Food Order System

A food ordering web application built with React, TypeScript, Redux Toolkit, and Material-UI.

## Features

- **Menu** — Browse food items by category, add items to cart
- **Cart** — Adjust quantities, view total, submit orders
- **Order History** — View past orders with full breakdown, clear history
- **Dark Mode** — Toggle light/dark theme, preference persisted to localStorage
- **Responsive Design** — Mobile-friendly layout with adaptive navigation
- **State Persistence** — Cart and order history saved to localStorage across sessions
- **Error Boundary** — Graceful error handling with retry option
- **Notifications** — Toast feedback for user actions (add to cart, submit order)

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit (state management)
- Material-UI v7 (UI components)
- TanStack Router (client-side routing)
- Vite (build tool)
- Vitest + React Testing Library (testing)

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm run test           # Run tests once
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
  components/        # Shared UI components
    RootLayout.tsx     # App shell with navigation tabs and theme toggle
    ErrorBoundary.tsx  # Error boundary with retry UI
    NotificationProvider.tsx  # Toast notification context provider
    ConfirmDialog.tsx  # Reusable confirmation dialog
  features/
    cart/              # Cart slice, component, hook, and tests
    menu/              # Menu component and tests
    history/           # Order history slice, components, and tests
  data/                # Mock food menu data
  types/               # Shared TypeScript type definitions
  store/               # Redux store, typed hooks, and persistence
  test/                # Test utilities and mock data factories
  router.tsx           # Route definitions (TanStack Router)
  theme.tsx            # MUI theme provider with dark mode support
  App.tsx              # Root component
```
