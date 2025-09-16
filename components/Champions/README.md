# Champions Component Structure

This directory contains the Champions feature with an organized structure that separates concerns and promotes maintainability.

## Directory Structure

```
Champions/
├── Champions.jsx                    # Main component
├── index.js                        # Central exports
├── components/                     # UI Components
│   ├── index.js                   # Component exports
│   ├── ChampionStats/             # Champion statistics components
│   │   ├── index.js
│   │   └── ChampionCard.jsx      # Individual champion card
│   └── States/                    # Loading, error, and empty states
│       ├── index.js
│       ├── EmptyState.jsx
│       ├── ErrorState.jsx
│       └── LoadingState.jsx
└── hooks/                         # Custom hooks organized by domain
    ├── index.js                   # Hook exports
    ├── data/                      # Data fetching hooks
    │   ├── index.js
    │   └── useChampionStats.js    # Champion data API calls
    ├── calculations/              # Business logic and calculations
    │   ├── index.js
    │   └── useChampionCalculations.js  # KDA colors, performance grades
    └── ui/                        # UI state and interactions
        ├── index.js
        └── useChampionUI.js       # Card expansion, hover states
```

## Components

### ChampionStats

- **ChampionCard**: Displays individual champion statistics with KDA, win rate, and games played

### States

- **LoadingState**: Shown while champion data is being fetched
- **ErrorState**: Displayed when API calls fail with retry functionality
- **EmptyState**: Shown when no champion data is available

## Hooks

### Data Hooks (`hooks/data/`)

- **useChampionStats**: Fetches champion statistics from the API, handles loading states and errors

### Calculation Hooks (`hooks/calculations/`)

- **useChampionCalculations**: Provides utility functions for:
  - KDA color coding based on performance
  - Win rate color coding
  - Performance grading (S+, S, A, B, C)
  - Champion name formatting

### UI Hooks (`hooks/ui/`)

- **useChampionUI**: Manages component interaction states:
  - Card expansion/collapse functionality
  - Hover state management
  - UI state persistence

## Usage

```jsx
import Champions from "./components/Champions";

// In your component
<Champions
  playerData={playerData}
  latestPatch={latestPatch}
  getChampionName={getChampionName}
/>;
```

## Import Patterns

Thanks to organized exports, you can import from different levels:

```jsx
// Import everything from main index
import { useChampionStats, ChampionCard, LoadingState } from "./index";

// Import from specific domains
import { useChampionStats } from "./hooks/data";
import { useChampionCalculations } from "./hooks/calculations";
import { ChampionCard } from "./components/ChampionStats";
```

## Architecture Benefits

1. **Separation of Concerns**: Data, calculations, and UI logic are separated
2. **Reusability**: Hooks and components can be easily reused
3. **Maintainability**: Clear structure makes code easy to find and modify
4. **Testability**: Isolated functions and hooks are easier to test
5. **Scalability**: Easy to add new hooks or components following the established patterns
