# Hooks Organization

This folder contains all custom React hooks organized by responsibility and domain.

## Structure

```
hooks/
├── index.js                 # Main exports
├── usePlayerData.js         # Main orchestrator hook
├── data/                    # Data management hooks
│   ├── index.js
│   ├── useChampionData.js   # Riot Games champion data (Data Dragon)
│   ├── useChampionStats.js  # Champion statistics data
│   ├── useMasteriesData.js  # Masteries data with retry logic
│   ├── useMatchData.js      # Match data with retry logic
│   └── useRankedData.js     # Ranked data with transformations
└── ui/                      # UI state management hooks
    ├── index.js
    ├── usePlayerProfile.js  # Player profile data
    ├── useSearchHistory.js  # Search history management
    └── useUpdateInfo.js     # Update information management
```

## Hook Categories

### 🔧 Main Orchestrator

- **usePlayerData**: Coordinates all data fetching and provides unified interface

### 📊 Data Hooks (`/data`)

- **useChampionData**: Fetches champion data from Riot Data Dragon API (patches, names)
- **useChampionStats**: Manages champion statistics data with queue type filtering
- **useMasteriesData**: Handles champion masteries with retry functionality
- **useMatchData**: Manages match data with retry functionality
- **useRankedData**: Handles ranked data fetching and transformation

### 🎨 UI Hooks (`/ui`)

- **usePlayerProfile**: Manages basic player/summoner information
- **useSearchHistory**: Manages search history state and interactions
- **useUpdateInfo**: Manages update information and state

## Usage

```jsx
// Import main orchestrator
import { usePlayerData } from "../hooks";

// Or import specific data hooks
import {
  useChampionData,
  useChampionStats,
  useMatchData,
  useRankedData,
} from "../hooks/data";

// Or import UI hooks
import { usePlayerProfile, useSearchHistory, useUpdateInfo } from "../hooks/ui";
```

## Benefits

- **Single Responsibility**: Each hook has one clear purpose
- **Reusability**: Specialized hooks can be used independently
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Isolated logic is easier to test
- **Organization**: Clear separation of concerns by domain
