# Hooks Organization

This folder contains all custom React hooks organized by responsibility and domain.

## Structure

```
hooks/
├── index.js                 # Main exports
├── usePlayerData.js         # Main orchestrator hook
├── data/                    # Data management hooks
│   ├── index.js
│   ├── usePlayerProfile.js  # Player profile data
│   ├── useRankedData.js     # Ranked data with transformations
│   ├── useMatchData.js      # Match data with retry logic
│   └── useMasteriesData.js  # Masteries data with retry logic
├── external/                # External API hooks
│   ├── index.js
│   └── useChampionData.js   # Riot Games champion data
└── ui/                      # UI state management hooks
    ├── index.js
    └── useSearchHistory.js  # Search history management
```

## Hook Categories

### 🔧 Main Orchestrator

- **usePlayerData**: Coordinates all data fetching and provides unified interface

### 📊 Data Hooks (`/data`)

- **usePlayerProfile**: Manages basic player/summoner information
- **useRankedData**: Handles ranked data fetching and transformation
- **useMatchData**: Manages match data with retry functionality
- **useMasteriesData**: Handles champion masteries with retry functionality

### 🌐 External Hooks (`/external`)

- **useChampionData**: Fetches champion data from Riot Games API

### 🎨 UI Hooks (`/ui`)

- **useSearchHistory**: Manages search history state and interactions

## Usage

```jsx
// Import main orchestrator
import { usePlayerData } from "../hooks";

// Or import specific hooks
import { usePlayerProfile, useMatchData, useChampionData } from "../hooks/data";
import { useSearchHistory } from "../hooks/ui";
```

## Benefits

- **Single Responsibility**: Each hook has one clear purpose
- **Reusability**: Specialized hooks can be used independently
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Isolated logic is easier to test
- **Organization**: Clear separation of concerns by domain
