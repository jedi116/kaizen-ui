# Kaizen

A personal self-improvement application for tracking finances, workouts, and nutrition. Built with React, TypeScript, and modern best practices.

## Features

- **Finance Tracking** - Track income and expenses, categorize transactions, and visualize spending patterns
- **Workout Logging** - Log exercise routines and track progress (coming soon)
- **Nutrition Monitoring** - Monitor food intake and track calories (coming soon)
- **Visual Analytics** - Beautiful charts and graphs for insights
- **Landing Page** - Modern marketing page for unauthenticated users

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**:
  - TanStack Query (server state)
  - Zustand (UI state)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router v7
- **Charts**: Recharts
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier + Husky

## Project Structure

```
src/
├── api/                    # API client and endpoints
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── finance/            # Finance-related components
│   ├── landing/            # Landing page components
│   ├── layout/             # Layout components (AppLayout, Sidebar, etc.)
│   └── ui/                 # Reusable UI components
├── config/                 # Configuration files
│   ├── dashboard.config.ts # Dashboard stats, modules config
│   ├── finance.config.ts   # Finance tabs, filters config
│   └── navigation.config.ts# Navigation items config
├── hooks/
│   ├── queries/            # TanStack Query hooks for data fetching
│   ├── mutations/          # TanStack Query hooks for mutations
│   └── useFinance.ts       # Composed finance hook
├── lib/                    # Utilities and helpers
├── pages/                  # Page components
├── stores/                 # Zustand stores (UI state only)
├── test/                   # Test utilities and setup
└── types/                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kaizen-ui

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

## Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│  ┌─────────┐    ┌────────────┐    ┌─────────────────────┐  │
│  │  Pages  │───▶│ Components │◀───│   Config Files      │  │
│  └────┬────┘    └────────────┘    └─────────────────────┘  │
│       │                                                      │
├───────┼──────────────────────────────────────────────────────┤
│       ▼         Custom Hooks Layer                           │
│  ┌─────────────────────┐    ┌───────────────────────────┐   │
│  │ TanStack Query Hooks│    │    UI State Hooks         │   │
│  │ (useCategories,     │    │    (useFinanceStore)      │   │
│  │  useJournals, etc.) │    │                           │   │
│  └──────────┬──────────┘    └─────────────┬─────────────┘   │
│             │                             │                  │
├─────────────┼─────────────────────────────┼──────────────────┤
│             ▼           State Layer       ▼                  │
│  ┌─────────────────────┐    ┌───────────────────────────┐   │
│  │ TanStack Query Cache│    │    Zustand UI State       │   │
│  │ (Server State)      │    │    (Modals, Filters, etc.)│   │
│  └──────────┬──────────┘    └───────────────────────────┘   │
│             │                                                │
├─────────────┼────────────────────────────────────────────────┤
│             ▼           API Layer                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              API Functions (financeApi, etc.)        │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Key Patterns

- **Separation of Concerns**: Business logic in hooks, presentation in components
- **Server State vs UI State**: TanStack Query for API data, Zustand for UI state
- **Configuration as Code**: Static config moved to dedicated files
- **Testable Components**: Small, focused components with clear props

## Testing

Tests are co-located with their components:

```
src/components/dashboard/
├── StatCard.tsx
├── StatCard.test.tsx
├── StatsGrid.tsx
└── StatsGrid.test.tsx
```

Run tests:

```bash
npm run test:run
```

## Code Quality

### Pre-commit Hooks

Husky runs lint-staged on commit to ensure code quality:

- ESLint checks and fixes
- Prettier formatting

### Formatting

Prettier is configured with:

- Single quotes
- 2-space indentation
- Trailing commas (ES5)
- 100 character line width

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure tests pass: `npm run test:run`
4. Ensure linting passes: `npm run lint`
5. Submit a pull request

## License

MIT
