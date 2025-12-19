# Core Components

The Core module contains essential UI components used throughout the application, including search functionality, player profile display, and global states.

## Directory Structure

```
Core/
├── index.js                      # Central exports
├── ApiLimitBanner.jsx           # Rate limit warning banner
├── components/                   # Core UI components
│   ├── index.js                 # Component exports
│   ├── Profile/                 # Player profile components
│   │   ├── index.js
│   │   └── PlayerProfile.jsx    # Main profile display
│   └── Search/                  # Search functionality
│       ├── index.js
│       ├── components/          # Search sub-components
│       ├── data/                # Search data hooks
│       ├── hooks/               # Search logic hooks
│       └── utils/               # Search utilities
└── States/                      # Global application states
    ├── index.js
    ├── WelcomeState.jsx        # Initial welcome screen
    ├── LoadingState.jsx        # Global loading state
    └── ErrorState.jsx          # Global error state
```

## Components Overview

### 🔍 Search Components

**Location**: `components/Search/`

The search module handles player lookup functionality.

#### Features:

- **Username/Tagline input**: Validation format (username#tagline)
- **Search history**: Local storage of recent searches
- **Auto-suggestions**: Dropdown of recent searches
- **Validation**: Real-time input validation

#### Search Flow:

1. User enters username#tagline
2. Validation checks format
3. Submission triggers API call via `usePlayerData`
4. Results populate throughout the app
5. Search saved to local history

### 👤 PlayerProfile Component

**Location**: `components/Profile/PlayerProfile.jsx`

Displays comprehensive player information at the top of the application.

#### Features:

- **Summoner Icon**: Profile icon with current patch
- **Player Name**: Username#Tagline display
- **Summoner Level**: Current account level
- **Update Button**: Force refresh from Riot API

#### Props:

- `playerData` - Player summoner data
- `searchPlayer` - Callback to refresh player data

### 🚨 ApiLimitBanner Component

**File**: `ApiLimitBanner.jsx`

Displays a warning banner when approaching or hitting Riot API rate limits.

#### Features:

- **Rate limit detection**: Monitors API response codes (429)
- **User notification**: Clear message about rate limits
- **Auto-dismiss**: Hides after cooldown period

### 🎭 State Components

**Location**: `States/`

Global application state components for different app phases.

#### WelcomeState

- Displayed on initial load before any search
- Features search bar and call-to-action
- Guides users to search for a player

#### LoadingState

- Shown during API data fetching
- Animated spinner or skeleton screens
- Indicates data is being loaded

#### ErrorState

- Displayed when API errors occur
- Shows error message and retry button
- User-friendly error explanations

## Usage Examples

### Search Component

```jsx
import { SearchForm } from "../components/Core";

<SearchForm onSearch={searchPlayer} isLoading={isLoading} />;
```

### PlayerProfile Component

```jsx
import { PlayerProfile } from "../components/Core";

<PlayerProfile playerData={playerData} searchPlayer={searchPlayer} />;
```

### State Components

```jsx
import { WelcomeState, LoadingState, ErrorState } from "../components/Core";

{
  isLoading ? (
    <LoadingState />
  ) : playerData ? (
    <MainContent />
  ) : error ? (
    <ErrorState error={error} onRetry={retry} />
  ) : (
    <WelcomeState />
  );
}
```

## Dependencies

- **ChampionContext**: Access to current patch version for profile icons
- **usePlayerData**: Main orchestration hook for player searches
- **Local Storage**: Stores search history persistently

## Styling Conventions

- **Primary color**: #DD1029 (Riot red)
- **Background**: #121212 (Dark theme)
- **Cards**: bg-zinc-800/90 with border-zinc-700
- **Text**: White primary, gray secondary

## Related Components

- Works in conjunction with Champions, Masteries, Matchs, and Ranked modules
- Provides foundational UI patterns used throughout the app
- Manages global application state transitions
