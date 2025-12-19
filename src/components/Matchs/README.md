# Matchs Folder Refactoring

## 📁 Structure After Refactoring

```
Matchs/
├── Matchs.jsx (simplified main component)
├── index.js (centralized exports)
├── hooks/
│   ├── useGameAssets.js      # Runes, spells, items management
│   ├── useMatchCalculations.js # KDA, CS, duration calculations
│   └── useMatchExpansion.js   # Match expansion state
└── components/
    ├── MatchCard.jsx         # Individual match card
    ├── MatchHeader.jsx       # Match header (queue, win/loss, duration)
    ├── PlayerMatchInfo.jsx   # Player info (champion, runes, spells)
    ├── PlayerStats.jsx       # Statistics (KDA, CS, items)
    ├── EmptyMatchState.jsx   # Empty state/retry
    └── [existing components...] # ItemTooltip, TeamColumn, etc.
```

## 🎯 Refactored Components

### 📦 Custom Hooks

#### `useGameAssets(latestPatch)`

- **Purpose**: Fetch and manage runes, spells and items data
- **Returns**:
  - `runesData`, `summonerSpells`, `itemsData`
  - `getRuneData()`, `getRuneTreeData()`, `getSummonerSpell()`, `getItemData()`
  - `loading`, `error`

#### `useMatchCalculations()`

- **Purpose**: Utility functions for match calculations
- **Returns**:
  - `calculateKDA()`, `calculateCS()`, `formatGameDuration()`
  - `getKDAColor()`, `getPlayerItems()`, `processParticipants()`, `splitTeams()`

#### `useMatchExpansion()`

- **Purpose**: Manage match details expansion state
- **Returns**:
  - `expandedMatches`, `toggleMatchDetails()`, `isMatchExpanded()`

### 🧩 Components

#### `MatchCard`

- **Purpose**: Main component to display a match
- **Props**: `match`, `playerData`, `latestPatch`, `searchPlayer`, `getChampionName`, hooks

#### `MatchHeader`

- **Purpose**: Display header information (queue type, win/loss, duration)
- **Props**: `match`, `currentPlayer`

#### `PlayerMatchInfo`

- **Purpose**: Display player information (champion, runes, spells)
- **Props**: `currentPlayer`, `latestPatch`, `getChampionName`, `gameAssets`, `matchCalculations`

#### `PlayerStats`

- **Purpose**: Display KDA, CS and items
- **Props**: `currentPlayer`, `latestPatch`, `gameAssets`, `matchCalculations`, `gameDuration`

#### `EmptyMatchState`

- **Purpose**: Handle empty state and retry button
- **Props**: `playerData`, `retryMatches`

## 📈 Refactoring Benefits

- **🧹 Cleaner code**: Matchs.jsx reduced from ~400 lines to ~35 lines
- **🔄 Reusability**: Hooks can be used in other components
- **🧪 Testability**: Each hook/component can be tested individually
- **📚 Maintainability**: Logic separated by responsibility
- **🚀 Performance**: Parallel asset loading, improved error handling

## 🔧 Usage

```jsx
import Matchs from "./Matchs/Matchs";

// Le composant utilise automatiquement tous les hooks et composants refactorisés
<Matchs
  matchData={matchData}
  playerData={playerData}
  latestPatch={latestPatch}
  searchPlayer={searchPlayer}
  getChampionName={getChampionName}
  retryMatches={retryMatches}
/>;
```
