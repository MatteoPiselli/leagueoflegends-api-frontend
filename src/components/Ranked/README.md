# Ranked Components

The Ranked module displays League of Legends ranked statistics for Solo/Duo and Flex queues.

## Directory Structure

```
Ranked/
├── Ranked.jsx                    # Main ranked component
├── index.js                      # Central exports
├── components/                   # Ranked UI components
│   ├── index.js                 # Component exports
│   └── RankCard/                # Rank display cards
│       ├── index.js
│       ├── RankCard.jsx         # Ranked queue card
│       └── UnrankedCard.jsx     # Unranked state card
└── hooks/                       # Custom hooks
    ├── index.js                 # Hook exports
    ├── calculations/            # Calculation hooks
    │   ├── index.js
    │   └── useRankedCalculations.js  # LP and series calculations
    ├── data/                    # Data hooks
    │   └── rankedData.js        # Ranked data constants
    └── utils/                   # Utility hooks
        └── useRankedUtils.js    # Formatting and display utilities
```

## Components Overview

### 🏆 Main Ranked Component

**File**: `Ranked.jsx`

The main container component that displays ranked statistics for both Solo/Duo and Flex queues.

#### Features:

- Displays up to 2 rank cards (Solo/Duo and Flex)
- Responsive grid layout
- Handles unranked states
- Empty state when no ranked data available

### 🃏 RankCard Component

**Location**: `components/RankCard/RankCard.jsx`

Individual ranked queue card showing detailed rank information.

#### Features:

- **Rank Display**: Tier and division (e.g., Gold III)
- **LP (League Points)**: Current points with visual indicator
- **Win/Loss Record**: Total wins and losses
- **Win Rate**: Calculated percentage with color coding
- **Series Progress**: Displays promotion/demotion series (BO3/BO5)
- **Rank Emblem**: Visual tier badge image

#### Props:

- `queue` - Queue data object (tier, rank, leaguePoints, wins, losses, series)
- `queueType` - Queue identifier ("RANKED_SOLO_5x5" or "RANKED_FLEX_SR")

#### Rank Tiers Supported:

- Iron, Bronze, Silver, Gold, Platinum, Emerald, Diamond, Master, Grandmaster, Challenger

### 🎭 UnrankedCard Component

**Location**: `components/RankCard/UnrankedCard.jsx`

Displayed when a player has not completed placement matches for a queue.

#### Features:

- Unranked state indicator
- Queue type label
- Encouragement to play placement matches

#### Props:

- `queueType` - Queue identifier for display label

## Hooks Overview

### 🧮 Calculations Hook

**Location**: `hooks/calculations/useRankedCalculations.js`

Provides calculation functions for ranked statistics.

#### Functions:

##### `calculateWinRate(wins, losses)`

Calculates and returns formatted win rate percentage.

- Returns "0%" if no games played
- Returns percentage with 1 decimal place (e.g., "56.7%")

##### `getSeriesProgress(series)`

Returns series progress array for visual display (BO3 or BO5).

- Returns array like ["W", "L", "N"] for series status
- "W" = Win, "L" = Loss, "N" = Not played

##### `isInPromotion(series)`

Checks if player is in a promotion series.

- Returns boolean indicating promotion status

### 🛠️ Utils Hook

**Location**: `hooks/utils/useRankedUtils.js`

Provides utility functions for formatting and visual display.

#### Functions:

##### `getRankColor(tier)`

Returns color code based on rank tier:

- Challenger/Grandmaster/Master: Blue shades
- Diamond/Emerald: Teal/Green shades
- Gold/Silver/Bronze/Iron: Yellow/Gray/Brown shades

##### `getQueueLabel(queueType)`

Converts queue type to display-friendly label:

- "RANKED_SOLO_5x5" → "Ranked Solo/Duo"
- "RANKED_FLEX_SR" → "Ranked Flex"

##### `formatLP(leaguePoints)`

Formats League Points for display:

- Returns string like "45 LP"
- Handles special cases (Master+ shows LP only)

## Visual Design

### Card Layout

- **Background**: Dark zinc-800 with transparency
- **Border**: Subtle zinc-700 border
- **Rank Emblem**: Centered tier badge (120x120px)
- **Stats Grid**: Win/Loss and Win Rate in 2 columns
- **Series Display**: Visual circles for promotion progress

### Color Coding

- **Win Rate**:

  - ≥55%: Green (#1FFF1F)
  - 45-54%: Yellow (#FFD700)
  - <45%: Red (#FF4444)

- **Rank Tier**: Dynamic colors based on tier (see `getRankColor`)

## Data Flow

```
API Backend (/api/ranked/:puuid)
    ↓
useRankedData hook (transforms to array)
    ↓
Ranked.jsx component
    ↓
RankCard / UnrankedCard components
```

## Dependencies

### External APIs

- **Riot Data Dragon**: Rank emblem images
  - URL: `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-{tier}.png`

### Internal Dependencies

- **useRankedData**: Data fetching hook from `src/hooks/data/`
- **Constants**: Queue type mappings

## Usage Example

```jsx
import Ranked from "./components/Ranked";

<Ranked rankedData={rankedData} />;
```

### Expected Data Format

```javascript
rankedData = [
  {
    queueType: "RANKED_SOLO_5x5",
    tier: "GOLD",
    rank: "III",
    leaguePoints: 45,
    wins: 67,
    losses: 53,
    series: null, // or { wins: 1, losses: 0, target: 3 }
  },
  // ... Flex queue if available
];
```

## Edge Cases Handled

- **Unranked**: Shows UnrankedCard when tier is "Unranked" or missing
- **No Games**: Win rate shows 0% when no games played
- **Master+**: No division display (only tier + LP)
- **Series**: Special display for promotion/demotion series (BO3/BO5)
- **Empty Data**: Component handles empty array gracefully

## Related Components

- **PlayerProfile**: Displays player info alongside ranked data
- **Core/States**: Loading and error states for ranked data
- **usePlayerData**: Main hook that orchestrates ranked data fetching
