# Food Order System

A food ordering web application built with React, TypeScript, Redux Toolkit, and Material-UI.

## Features

- **Menu** — Browse food items by category, add items to cart
- **Cart** — Adjust quantities, view total, submit orders
- **Order History** — View past orders with timestamps, clear history

## Tech Stack

- React 19 + TypeScript
- Redux Toolkit (state management)
- Material-UI (UI components)
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
  features/
    cart/          # Cart slice, component, and tests
    menu/          # Menu component
    history/       # Order history slice, component
  data/            # Mock food menu data
  types/           # Shared TypeScript types
  store/           # Redux store configuration
  App.tsx          # Root component with tab navigation
```
