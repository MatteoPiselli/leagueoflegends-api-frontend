# Masteries Components

The Masteries module handles the display of champion mastery information for League of Legends players.

## Directory Structure

```
Masteries/
├── Masteries.jsx                  # Main masteries component
├── index.js                      # Main export file
├── components/                   # Mastery UI components
│   ├── index.js                 # Component exports
│   ├── MasteryCard/             # Individual mastery card
│   │   ├── index.js
│   │   └── MasteryCard.jsx      # Champion mastery display card
│   └── States/                  # Application state components
│       ├── index.js
│       └── EmptyMasteryState.jsx # Empty state when no masteries
└── hooks/                       # Custom hooks
    ├── index.js                 # Hook exports
    └── ui/                      # UI display hooks
        ├── index.js
        └── useMasteryDisplay.js # Formatting and display utilities
```

## Components Overview

### 🏆 Main Masteries Component

**File**: `Masteries.jsx`

The main container component that orchestrates the display of all champion masteries for a player.

#### Features:

- Displays champion mastery cards in a responsive grid
- Handles empty state when no masteries are available
- Integrates with external champion data (patches, names)

### 🃏 MasteryCard Component

**Location**: `components/MasteryCard/`

Individual champion mastery card displaying detailed mastery information.

#### Features:

- **Champion Display**: Shows champion icon and name
- **Mastery Level**: Visual mastery level badge (4-10+)
- **Mastery Points**: Formatted point display (K, M notation)
- **Visual Design**: Champion banner background with mastery icons

#### Props:

- `mastery` - Mastery data object (championId, championLevel, championPoints)
- `latestPatch` - Current game patch for champion images
- `getChampionName` - Function to resolve champion names from IDs

### 🎭 States Components

**Location**: `components/States/`

Components for handling different application states.

- **EmptyMasteryState.jsx** - Displayed when a player has no champion masteries to show

## Hooks Overview

### 🎨 UI Display Hook

**Location**: `hooks/ui/useMasteryDisplay.js`

Provides utility functions for formatting and displaying mastery information.

#### Functions:

##### `formatMasteryPoints(points)`

Formats mastery points into human-readable format:

- `1,500,000+ points` → `1.5M`
- `25,000+ points` → `25.0K`
- `< 1,000 points` → `500` (with locale formatting)

##### `getMasteryIconUrl(championLevel)`

Returns the appropriate mastery icon URL based on champion level:

- **Levels 4-10**: Specific mastery crest icons
- **Levels 10+**: Uses level 10 icon
- **Levels 0-3**: Default level 0 icon

### Card Layout

- **Background**: Champion-themed banner from Community Dragon
- **Champion Icon**: Circular champion portrait (60x60px)
- **Mastery Badge**: Centered mastery level icon (40x40px)
- **Points Display**: Formatted point count with "Pts" suffix

## Dependencies

- **React** - Component framework and hooks
- **Next.js** - Image optimization and framework features
- **Tailwind CSS** - Utility-first CSS styling
- **Riot Games API** - Champion mastery data source
- **Data Dragon CDN** - Champion images and data
- **Community Dragon** - Mastery icons and visual assets
