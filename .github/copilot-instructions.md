# SummonerFinder.gg Frontend - AI Coding Agent Instructions

## Architecture Overview

This is a **Next.js 12** application for displaying League of Legends player statistics. The architecture follows a **component-driven design** with React hooks for state management.

```
Next.js App → Components (Feature Modules) → Hooks (Data/UI) → Backend API
```

### Key Technical Stack

- **Next.js 12.1.6** - React framework (Pages Router, not App Router)
- **React 18.1.0** - Component framework
- **Tailwind CSS 3.4.13** - Utility-first styling
- **Framer Motion** (motion 12.15.0) - Animations
- **Lucide React** - Icon library
- **date-fns** - Date formatting

**Dev server**: Port `3001` (configured in `package.json` script: `next dev -p 3001`)

## Component Architecture Pattern

Every **feature module** (Champions, Masteries, Matchs, Ranked, Core) follows this structure:

```
Feature/
├── Feature.jsx               # Main component (orchestrator)
├── index.js                  # Exports
├── components/               # UI components
│   ├── index.js
│   ├── FeatureCard/         # Card components (nested structure)
│   ├── States/              # LoadingState, ErrorState, EmptyState
│   └── ui/                  # Generic UI (headers, lists, buttons)
├── hooks/                    # Custom hooks
│   ├── data/                # Data fetching hooks
│   └── ui/ or utils/        # UI logic/utilities
└── README.md                # Module documentation
```

**Example**: `components/Champions/` (see `components/Champions/README.md`)

### Component Nesting Pattern

Components use **deep nesting** for logical grouping:

```javascript
// components/Champions/components/ChampionCard/ChampionInfo/ChampionInfo.jsx
export const ChampionInfo = ({ mastery, championName }) => {
  // Sub-component of ChampionCard
};
```

**Every folder** has `index.js` for clean imports:

```javascript
// components/Champions/components/index.js
export { ChampionCard } from "./ChampionCard";
export { ChampionsList, ChampionsHeader, RefreshButton } from "./ui";
```

## Data Flow Architecture

### 1. Main Orchestrator: `usePlayerData` Hook

**Location**: `hooks/usePlayerData.js`

Central hook that coordinates ALL data fetching:

```javascript
const {
  playerData,
  rankedData,
  matchData,
  masteriesData,
  isLoading,
  error,
  searchPlayer,
  retryMatches,
} = usePlayerData();
```

**Pattern**: Calls specialized hooks in parallel after player search:

```javascript
await Promise.all([
  fetchRankedData(puuid, forceUpdate),
  fetchMatchData(puuid, forceUpdate),
  fetchMasteriesData(puuid, forceUpdate),
  fetchChampionStatsData(puuid, forceUpdate, "400"),
]);
```

### 2. Specialized Data Hooks

All located in `hooks/data/`:

- **usePlayerProfile** - Summoner info (calls `/api/summoner/:username/:tagline`)
- **useRankedData** - Ranked stats with transformation (calls `/api/ranked/:puuid`)
- **useMatchData** - Match history with retry (calls `/api/matchs/:puuid`)
- **useMasteriesData** - Champion masteries (calls `/api/masteries/:puuid`)
- **useChampionStats** - Champion statistics (calls `/api/champions/:puuid/stats`)
- **useChampionData** - Riot Data Dragon API (champion data, patches)

### 3. Backend API Configuration

**Hardcoded base URL**: `http://localhost:3000`

Pattern for all API calls:

```javascript
const url = new URL(`http://localhost:3000/api/endpoint/${param}`);
if (forceUpdate) {
  url.searchParams.set("updateClicked", "true");
}
const response = await fetch(url.toString());
```

**Note**: No environment variable for API URL - change directly in hook files.

### 4. Data Transformation Pattern

Hooks transform backend responses to frontend-friendly formats:

```javascript
// useRankedData.js - transforms nested object to array
const transformRankedData = (ranked) => {
  const rankedArray = [];
  if (ranked.ranked.soloDuo.tier !== "Unranked") {
    rankedArray.push({ queueType: "RANKED_SOLO_5x5", tier: ..., rank: ... });
  }
  return rankedArray;
};
```

## Context Pattern

### ChampionContext (`contexts/ChampionContext.js`)

Provides **global champion data** (names, patches) to all components:

```javascript
<ChampionProvider>
  <PlayerProfile />
  <Champions />
  <Masteries />
</ChampionProvider>
```

**Usage in components**:

```javascript
import { useChampion } from "../../contexts/ChampionContext";
const { latestPatch, getChampionName } = useChampion();
```

**Critical**: Always wrap feature components in `<ChampionProvider>` (see `components/App.jsx`)

## Hook Patterns

### Data Fetching Hook Structure

All data hooks follow this pattern:

```javascript
export const useFeatureData = () => {
  const [data, setData] = useState(initialState);

  const fetchData = async (puuid, forceUpdate = false) => {
    if (!puuid) {
      setData(initialState);
      return;
    }

    try {
      const url = new URL(`http://localhost:3000/api/endpoint/${puuid}`);
      if (forceUpdate) url.searchParams.set("updateClicked", "true");

      const response = await fetch(url.toString());
      if (!response.ok) {
        handleHttpError(response.status, response.statusText);
        setData(initialState);
        return;
      }

      const result = await response.json();
      setData(transformData(result)); // Optional transformation
    } catch (error) {
      console.error("Error:", error);
      setData(initialState);
    }
  };

  return { data, fetchData, setData };
};
```

### Retry Pattern

For expensive API calls (matches, champion stats):

```javascript
const retryMatches = async () => {
  const puuid = playerData?.summoner?.puuid;
  if (puuid) {
    await fetchMatchData(puuid, true); // forceUpdate=true
  }
};
```

### UI Logic Hook Structure

Hooks for UI logic (formatting, colors, state):

```javascript
// hooks/utils/useChampionUtils.js
export const useChampionUtils = () => {
  const getKdaColor = (kda) => {
    if (kda >= 5) return "text-[#00D4FF]";
    if (kda >= 3) return "text-[#1FFF1F]";
    return "text-white";
  };

  return { getKdaColor, getWinRateColor };
};
```

## Error Handling

### Centralized HTTP Error Handler

**Location**: `utils/errorHandling.js`

```javascript
import { handleHttpError } from "../../utils/errorHandling";

if (!response.ok) {
  handleHttpError(response.status, response.statusText); // Shows alert
  setData([]); // Reset state
  return;
}
```

**Behavior**: Displays user-friendly alerts for HTTP errors (404, 429, 500, etc.)

### Error State Pattern

Components show error states with retry buttons:

```jsx
{
  error ? (
    <ErrorState error={error} onRetry={() => refetch()} />
  ) : (
    <ContentComponent />
  );
}
```

## Styling Conventions

### Tailwind CSS Patterns

**Color scheme**:

- Primary red: `#DD1029`
- Background: `#121212`
- Card backgrounds: `bg-zinc-800/90`
- Borders: `border-zinc-700`

**Common patterns**:

```jsx
// Card container
<div className="bg-zinc-800/90 rounded-lg border border-zinc-700 p-4">

// KDA color coding
<span className={getKdaColor(kda)}>

// Scrollbar styling
<div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">

// Hover effects
<button className="hover:bg-zinc-700 transition-colors">
```

### Image Optimization

Use **Next.js Image** for all images:

```jsx
import Image from "next/image";

// Champion icons (Riot CDN)
<Image
  src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${championName}.png`}
  alt={championName}
  width={60}
  height={60}
/>

// Static assets
<Image src="/logo.png" alt="Logo" width={300} height={110} priority={true} />
```

## State Management Patterns

### Conditional Rendering Pattern

Main app follows this hierarchy (see `components/App.jsx`):

```jsx
{
  isLoading ? (
    <LoadingState />
  ) : playerData ? (
    <>
      <PlayerProfile />
      <Champions />
      <Masteries />
      <Matchs />
    </>
  ) : error ? (
    <ErrorState />
  ) : (
    <WelcomeState />
  );
}
```

### Search Flow

1. User submits search in `SearchForm` component
2. Calls `onSearch(username, tagline)` (from `usePlayerData`)
3. `usePlayerData.searchPlayer()` orchestrates:
   - Fetches player profile first
   - If successful, fetches all related data in parallel
   - Updates state in specialized hooks
4. Components re-render with new data

## Constants & Configuration

### Queue Types (`constants/queueTypes.js`)

Mappings for League of Legends game modes:

```javascript
export const GAME_QUEUE_TYPES = {
  400: "Normal Draft",
  420: "Ranked Solo/Duo",
  440: "Ranked Flex",
  450: "ARAM",
  // ... (see file for complete list)
};
```

**Usage**: Display human-readable queue names in Match History and Champion Stats components.

## External API Integration

### Riot Data Dragon CDN

**Champion data** (`useChampionData` hook):

```javascript
// Latest patch
const patchResponse = await fetch(
  "https://ddragon.leagueoflegends.com/api/versions.json"
);
const latestPatch = patches[0]; // e.g., "14.21.1"

// Champion data
const championResponse = await fetch(
  `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/champion.json`
);
```

**Asset URLs**:

- Champion icons: `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${name}.png`
- Items: `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${itemId}.png`
- Summoner spells: `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${spellName}.png`

### Community Dragon CDN

**Mastery icons** (`useMasteryDisplay` hook):

```javascript
`https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_${level}.png`;
```

## Development Workflow

### Starting the dev server

```bash
yarn dev       # Starts on port 3001
```

**Note**: Backend must run on port 3000 for API calls to work.

### Project Structure Navigation

**IMPORTANT**: This project uses **Next.js Pages Router** (v12), not App Router.

```
pages/
├── _app.jsx              # Next.js app wrapper (global ChampionProvider)
└── index.jsx             # Main page route (/)

src/
├── components/
│   ├── Champions/        # Champion statistics module
│   ├── Masteries/        # Champion masteries module
│   ├── Matchs/           # Match history module
│   ├── Ranked/           # Ranked statistics module
│   └── Core/             # Search, Profile, UI components

hooks/
├── usePlayerData.js      # Main orchestrator hook
├── data/                 # Data fetching hooks
└── ui/                   # UI logic hooks

contexts/
└── ChampionContext.js    # Global champion data context

utils/
├── errorHandling.js      # HTTP error handler
└── dateFormatter.js      # Date/time formatting
```

## Common Patterns

### Exports Pattern

**Every folder** exports through `index.js`:

```javascript
// components/Champions/hooks/index.js
export { useChampionStats } from "./data/useChampionStats";
export { useChampionUtils } from "./utils/useChampionUtils";

// Import in component
import { useChampionStats, useChampionUtils } from "../hooks";
```

### Props Drilling vs Context

- **Context**: Global data (champion names, patches)
- **Props**: Component-specific data (playerData, matchData, callbacks)

### Loading States

Three-state pattern in components:

```jsx
{
  loading ? (
    <LoadingState />
  ) : data.length === 0 ? (
    <EmptyState />
  ) : (
    <DataDisplay data={data} />
  );
}
```

## File Naming Conventions

- Components: PascalCase (e.g., `ChampionCard.jsx`)
- Hooks: camelCase starting with "use" (e.g., `useChampionData.js`)
- Utils: camelCase (e.g., `errorHandling.js`)
- Contexts: PascalCase ending with "Context" (e.g., `ChampionContext.js`)

## Key Dependencies

- **next** (12.1.6) - React framework
- **react** (18.1.0) - Component library
- **tailwindcss** (3.4.13) - Styling
- **motion** (12.15.0) - Animations (Framer Motion fork)
- **lucide-react** - Icons
- **date-fns** - Date formatting

## Integration with Backend

**Backend repository**: `leagueoflegends-api-backend`

**API Base URL**: `http://localhost:3000` (hardcoded in all data hooks)

**API endpoints used**:

- `GET /api/summoner/:username/:tagline` - Player profile
- `GET /api/ranked/:puuid?updateClicked=true` - Ranked stats
- `GET /api/matchs/:puuid?updateClicked=true` - Match history
- `GET /api/matchs/details/:matchId` - Match details
- `GET /api/masteries/:puuid?updateClicked=true` - Champion masteries
- `GET /api/champions/:puuid/stats?updateClicked=true&queueType=400` - Champion stats

**Query Parameters**:
- `updateClicked=true` - Forces backend to refresh data from Riot API instead of serving cached MongoDB data
- `queueType` - (Champion stats only) Game mode filter: "400" (Normal Draft), "420" (Ranked Solo), "440" (Ranked Flex). Defaults to "400".

**Note**: All hooks use `updateClicked=true` query param to force backend data refresh. Champion stats also accepts `queueType` query param (e.g., "400" for normal draft, "420" for ranked solo, defaults to "400"). Champion stats also accepts `queueType` query param (e.g., "400" for normal draft, "420" for ranked solo, defaults to "400").
