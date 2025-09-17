# Champions Component Structure

This directory contains the Champions feature with an organized structure that separates concerns and promotes maintainability.

## Directory Structure

```
Champions/
├── Champions.jsx                    # Main component
├── index.js                        # Central exports
├── components/                     # UI Components
│   ├── index.js                   # Component exports
│   ├── ChampionCard/              # Champion card with detailed breakdown
│   │   ├── index.js
│   │   ├── ChampionCard.jsx       # Main champion card container
│   │   ├── ChampionInfo/          # Champion info sub-component
│   │   │   ├── index.js
│   │   │   └── ChampionInfo.jsx
│   │   └── ChampionStats/         # Champion stats sub-component
│   │       ├── index.js
│   │       └── ChampionStats.jsx
│   ├── States/                    # Loading, error, and empty states
│   │   ├── index.js
│   │   ├── EmptyState.jsx
│   │   ├── ErrorState.jsx
│   │   └── LoadingState.jsx
│   └── ui/                        # Generic UI components
│       ├── index.js
│       ├── Header/                # Header components
│       │   ├── index.js
│       │   └── ChampionsHeader.jsx
│       ├── List/                  # List components
│       │   ├── index.js
│       │   └── ChampionsList.jsx
│       └── Buttons/               # Button components
│           ├── index.js
│           └── RefreshButton.jsx
└── hooks/                         # Custom hooks organized by domain
    ├── index.js                   # Hook exports
    ├── data/                      # Data fetching hooks
    │   ├── index.js
    │   └── useChampionStats.js    # Champion data API calls
    └── utils/                     # Utility hooks
        ├── index.js
        └── useChampionUtils.js    # Formatting and color utilities
```

## Components

### ChampionCard

- **ChampionCard**: Main container for champion statistics with complete champion data
- **ChampionInfo**: Sub-component handling champion basic information (name, mastery, etc.)
- **ChampionStats**: Sub-component handling champion statistics (KDA, win rate, games played)

### UI Components

- **ChampionsHeader**: Header section for the champions module
- **ChampionsList**: List container for displaying champion cards
- **RefreshButton**: Button for refreshing champion data

### States

- **LoadingState**: Shown while champion data is being fetched
- **ErrorState**: Displayed when API calls fail with retry functionality
- **EmptyState**: Shown when no champion data is available

## Hooks

### Data Hooks (`hooks/data/`)

- **useChampionStats**: Fetches champion statistics from the API with complete state management:
  - Handles loading states during API calls
  - Manages error states with specific error messages (rate limits, server errors)
  - Provides refetch functionality for retry operations
  - Returns championStats array, loading boolean, error string, and refetch function

### Utils Hooks (`hooks/utils/`)

- **useChampionUtils**: Provides utility functions for formatting and display:
  - KDA color coding based on performance (getKdaColor)
  - Win rate color coding (getWinRateColor)
  - Optimized for visual feedback and user experience
