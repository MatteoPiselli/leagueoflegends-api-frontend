# Core Components Structure

This directory contains the core application components organized by domain and functionality.

## Directory Structure

```
Core/
├── index.js                      # Central exports
├── components/                   # UI Components organized by domain
│   ├── index.js                 # Component exports
│   ├── Search/                  # Search functionality
│   │   ├── index.js
│   │   └── SearchForm.jsx       # Main search form with history
│   ├── Profile/                 # Player profile components
│   │   ├── index.js
│   │   └── PlayerProfile.jsx    # Player info display
│   ├── Stats/                   # Statistics components
│   │   ├── index.js
│   │   ├── Ranked.jsx          # Ranked stats display
│   │   └── Masteries.jsx       # Champion mastery display
│   └── UI/                      # General UI components
│       ├── index.js
│       └── LoadingState.jsx     # Loading indicator
└── hooks/                       # Custom hooks organized by domain
    ├── index.js                 # Hook exports
    ├── calculations/            # Business logic and calculations
    │   ├── index.js
    │   ├── useRankedCalculations.js   # Rank icons, colors, win rates
    │   └── useMasteryCalculations.js  # Mastery icons, formatting
    └── ui/                      # UI state and interactions
        └── index.js             # Ready for future UI hooks
```

## Components

### Search

- **SearchForm**: Advanced search form with username/tag input, search history, and region selection

### Profile

- **PlayerProfile**: Displays player avatar, level, username and tagline

### Stats

- **Ranked**: Shows ranked statistics for Solo/Duo and Flex queues with rank icons and win rates
- **Masteries**: Displays top champion masteries with mastery badges and points

### UI

- **LoadingState**: Loading indicator with animated Poro

## Hooks

### Calculation Hooks (`hooks/calculations/`)

- **useRankedCalculations**: Provides utilities for:

  - Rank icon URLs based on tier
  - Win rate calculations
  - Rank color coding
  - Rank display formatting

- **useMasteryCalculations**: Provides utilities for:
  - Mastery icon URLs based on level
  - Mastery color coding
  - Points formatting (k, M)
  - Level display formatting

### UI Hooks (`hooks/ui/`)

- Ready for future UI interaction hooks

## Usage

```jsx
import {
  SearchForm,
  PlayerProfile,
  Ranked,
  Masteries,
  LoadingState
} from "./components/Core";

// In your component
<SearchForm onSearch={handleSearch} history={searchHistory} />
<PlayerProfile playerData={player} latestPatch={patch} />
<Ranked rankedData={rankedStats} />
<Masteries masteriesData={masteries} getChampionName={getChampion} />
<LoadingState />
```

## Import Patterns

Thanks to organized exports, you can import from different levels:

```jsx
// Import everything from main index
import { SearchForm, useRankedCalculations } from "./Core";

// Import from specific domains
import { useRankedCalculations } from "./Core/hooks/calculations";
import { SearchForm } from "./Core/components/Search";
```

## Architecture Benefits

1. **Domain Separation**: Search, Profile, Stats, and UI are clearly separated
2. **Reusable Logic**: Calculation hooks can be used across components
3. **Maintainability**: Easy to find and modify related functionality
4. **Scalability**: Simple to add new domains or components
5. **Clean Imports**: Centralized exports prevent import chaos
