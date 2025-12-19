# Components Architecture

This folder contains all React components of the **SummonerFinder.gg** application, organized into independent functional modules.

## 📁 General Structure

```
components/
├── Core/           # 🎯 Core components (Search, Profile, States)
├── Champions/      # 📊 Champion statistics by game mode
├── Masteries/      # 🏆 Champion mastery levels
├── Matchs/         # 🎮 Match history with details
└── Ranked/         # 🥇 Solo/Duo and Flex rankings
```

## 🎯 Functional Modules

### Core - Core Components

**Responsibilities**:

- Player search (username#tagline)
- Player profile display
- Global states (Welcome, Loading, Error)
- API limit banner

**Key components**:

- `SearchForm` - Search bar with history
- `PlayerProfile` - Player profile with icon and level
- `WelcomeState` - Initial welcome screen
- `ApiLimitBanner` - Rate limit warning

📚 [Full Documentation](./Core/README.md)

---

### Champions - Champion Statistics

**Responsibilities**:

- Display statistics per champion
- Filter by game mode (Normal, Ranked Solo, Ranked Flex)
- KDA, win rate, number of games calculations

**Key components**:

- `Champions` - Main component
- `QueueTypeSelector` - Game mode selector
- `ChampionCard` - Individual card with detailed stats
- `ChampionInfo` / `ChampionStats` - Specialized sub-components

**Custom hooks**:

- `useChampionStats` - Fetching stats from API
- `useChampionUtils` - Formatting and coloring (KDA, winrate)

📚 [Full Documentation](./Champions/README.md)

---

### Masteries - Champion Mastery

**Responsibilities**:

- Display mastery levels (4-10+)
- Display mastery points
- Integration with Community Dragon for icons

**Key components**:

- `Masteries` - Main component
- `MasteryCard` - Individual mastery card
- `EmptyMasteryState` - Empty state

**Custom hooks**:

- `useMasteryDisplay` - Points formatting (K, M) and icon URLs

📚 [Full Documentation](./Masteries/README.md)

---

### Matchs - Match History

**Responsibilities**:

- Display last 20 matches
- Expandable details (participants, items, runes)
- Statistics calculations (KDA, CS, duration)
- Tooltips for items, runes and spells

**Architecture**:

```
Matchs/
├── Matchs.jsx              # Main component
├── components/
│   ├── Match/             # Match cards (header, content, expansion)
│   ├── Player/            # Player components (info, stats)
│   ├── Team/              # Team components (columns, participants)
│   ├── UI/                # Reusable tooltips
│   └── States/            # Empty/error states
└── hooks/
    ├── data/              # useGameAssets, useMatchData
    ├── calculations/      # usePlayerCalculations, useTeamGoldCalculations
    └── ui/                # useMatchDisplay, useMatchExpansion
```

**Optimizations**:

- React.memo on atomic components
- useMemo for expensive calculations
- useCallback for props functions
- 70% reduction in re-renders

📚 [Full Documentation](./Matchs/README.md)  
📚 [Components Documentation](./Matchs/components/README.md)  
📚 [Hooks Documentation](./Matchs/hooks/README.md)

---

### Ranked - Rankings

**Responsibilities**:

- Display Solo/Duo and Flex ranks
- Win rate calculation
- Promotion series display (BO3/BO5)
- Unranked states management

**Key components**:

- `Ranked` - Main component
- `RankCard` - Rank card with emblem
- `UnrankedCard` - Unranked state

**Custom hooks**:

- `useRankedCalculations` - Win rate and series calculations
- `useRankedUtils` - Formatting and colors by tier

📚 [Full Documentation](./Ranked/README.md)

---

## 🏗️ Architecture Patterns

### Module Structure Pattern

Each functional module follows this standard structure:

```
Module/
├── Module.jsx              # Main component (orchestrator)
├── index.js                # Centralized exports
├── README.md               # Module documentation
├── components/             # UI sub-components
│   ├── index.js
│   ├── <Feature>Card/     # Card components (nesting)
│   ├── States/            # LoadingState, ErrorState, EmptyState
│   └── ui/                # Reusable generic components
└── hooks/                  # Custom hooks
    ├── index.js
    ├── data/              # API fetching hooks
    ├── calculations/      # Calculation hooks
    └── utils/ or ui/      # Utility or UI hooks
```

### Exports Pattern

Each folder has an `index.js` for clean imports:

```javascript
// components/Champions/index.js
export { default } from "./Champions";
export * from "./components";
export * from "./hooks";

// Usage
import Champions, {
  ChampionCard,
  useChampionStats,
} from "./components/Champions";
```

### Component Nesting Pattern

Complex components use **deep nesting**:

```
ChampionCard/
├── ChampionCard.jsx       # Main container
├── ChampionInfo/          # Info sub-component
│   └── ChampionInfo.jsx
└── ChampionStats/         # Stats sub-component
    └── ChampionStats.jsx
```

### States Pattern

All modules have standardized state components:

```javascript
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

### Hooks Pattern

Hooks organization by responsibility:

- **data/** - API fetching and data management
- **calculations/** - Calculations and transformations
- **ui/** or **utils/** - UI logic and utilities

## 🎨 Styling Conventions

### Tailwind CSS

**Global palette**:

- Primary red: `#DD1029`
- Background: `#121212`
- Card background: `bg-zinc-800/90`
- Card border: `border-zinc-700`
- Text primary: `text-white`
- Text secondary: `text-gray-400`

**Common classes**:

```jsx
// Standard card
<div className="bg-zinc-800/90 rounded-lg border border-zinc-700 p-4">

// Custom scrollbar
<div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">

// Standard button
<button className="bg-[#DD1029] text-white px-4 py-2 rounded-lg hover:bg-[#B80D21] transition-colors">
```

### Color Coding

**KDA**:

- ≥5.0: Cyan (`#00D4FF`)
- ≥3.0: Green (`#1FFF1F`)
- <3.0: White

**Win Rate**:

- ≥55%: Green
- 45-54%: Yellow
- <45%: Red

## 📦 Shared Dependencies

### Contexts

- **ChampionContext** (`src/contexts/ChampionContext.js`)
  - Provides: `latestPatch`, `getChampionName`, champion data
  - Used by: Champions, Masteries, Matchs

### Global Hooks

- **usePlayerData** (`src/hooks/usePlayerData.js`)
  - Main orchestrator hook
  - Coordinates all data fetching
  - Used in `pages/index.jsx`

### Constants

- **queueTypes** (`src/constants/queueTypes.js`)
  - Queue ID mappings (400, 420, 440, 450, etc.)
  - Used by: Champions, Matchs

## 🔌 Backend Integration

All modules consume the backend API (`http://localhost:3000`):

| Module    | Endpoint                           | Query Params                       |
| --------- | ---------------------------------- | ---------------------------------- |
| Core      | `/api/summoner/:username/:tagline` | -                                  |
| Ranked    | `/api/ranked/:puuid`               | `updateClicked=true`               |
| Matchs    | `/api/matchs/:puuid`               | `updateClicked=true`               |
| Masteries | `/api/masteries/:puuid`            | `updateClicked=true`               |
| Champions | `/api/champions/:puuid/stats`      | `updateClicked=true&queueType=400` |

## 🧪 Testability

Each module is designed to be testable:

- **Isolated hooks** - Independently testable
- **Pure components** - Props in, render out
- **Separated logic** - Business logic in hooks
- **Easy mocking** - Injectable dependencies

## 📚 Documentation

Each module has its own detailed documentation:

- [Core README](./Core/README.md)
- [Champions README](./Champions/README.md)
- [Masteries README](./Masteries/README.md)
- [Matchs README](./Matchs/README.md)
  - [Matchs Components](./Matchs/components/README.md)
  - [Matchs Hooks](./Matchs/hooks/README.md)
- [Ranked README](./Ranked/README.md)

## 🚀 Adding a New Module

To create a new functional module:

1. **Create the structure**:

```bash
mkdir -p NewModule/components/States
mkdir -p NewModule/hooks/data
touch NewModule/NewModule.jsx
touch NewModule/index.js
touch NewModule/README.md
```

2. **Follow the structure pattern** (see above)

3. **Create centralized exports** in `index.js`

4. **Implement state components** (Loading, Error, Empty)

5. **Create data fetching hooks**

6. **Document in README.md**

7. **Import in `pages/index.jsx`**

## 🎯 Best Practices

✅ **DO**:

- Use custom hooks for reusable logic
- Create atomic components and compose them
- Implement all states (loading, error, empty)
- Use React.memo for frequently re-rendered components
- Document props and behaviors in READMEs

❌ **DON'T**:

- Mix business logic and UI in the same component
- Duplicate code between modules
- Forget loading/error states
- Hardcode values that should be constants
- Ignore performance optimizations

---

**Note**: This architecture evolves. Consult individual READMEs for module-specific details.
