# Organized Matchs Hooks Structure

## 📁 New `hooks/` Folder Organization

```
hooks/
├── index.js (centralized exports)
├── data/                    # 📊 Data management hooks
│   ├── index.js
│   └── useGameAssets.js     # Runes, spells, items from Riot API
├── calculations/            # 🧮 Calculation and utility hooks
│   ├── index.js
│   ├── useMatchCalculations.js   # Main hook combining all calculations
│   ├── usePlayerStats.js         # Player-specific calculations (KDA, CS)
│   └── useMatchUtils.js          # Match utilities (duration, teams)
└── ui/                      # 🎨 User interface hooks
    ├── index.js
    └── useMatchExpansion.js # Match details expansion management
```

## 🎯 Organization Logic

### 📊 **data/** - Data Hooks

### Data Hooks (`hooks/data/`)

- **useGameAssets**: Fetches champion, spell, rune, and item data from Data Dragon API
- **useMatchData**: Provides utilities for:
  - Player items extraction from match data
  - Player data extraction by PUUID
  - Team composition analysis
  - Match timeline events filtering
  - Champion ban data extraction
  - Parallel data loading from Riot API
  - Helper functions to retrieve specific data
  - Loading and error state management

### 🧮 **calculations/** - Calculation Hooks

- `useMatchCalculations.js`: Main hook combining all calculations
- `usePlayerStats.js`: Player-specific statistics calculations
  - KDA calculation and coloring
  - CS and CS/min calculation
  - Player items retrieval
- `useMatchUtils.js`: General match utilities
  - Match duration formatting
  - Participants processing
  - Teams splitting

### 🎨 **ui/** - UI Hooks

- `useMatchExpansion.js`: Match details expansion state management
  - Toggle expansion per match
  - Global state of expanded matches
  - Function to collapse all matches

## 📈 Benefits of This Organization

### 🔍 **Specialization and Clarity**

- **Single responsibility**: Each hook has a clear function
- **Reusability**: Specialized hooks can be used independently
- **Targeted tests**: Each hook can be tested separately

### 🔄 **Composition and Flexibility**

- **Main hook**: `useMatchCalculations` combines all calculations
- **Specialized hooks**: Can be used individually if needed
- **Extensibility**: Easy to add new calculations or utilities

### 🧪 **Maintainability**

- **Isolated modifications**: Changes limited to their domain
- **DRY code**: Avoids logic duplication
- **Modular structure**: Facilitates future refactorings

## 🔧 Hooks Usage

### Grouped import (recommended)

```jsx
import {
  useGameAssets,
  useMatchCalculations,
  useMatchExpansion,
} from "./hooks/Matchs";
```

### Import par catégorie

```jsx
import { useGameAssets } from "./hooks/Matchs/data";
import { usePlayerStats, useMatchUtils } from "./hooks/Matchs/calculations";
import { useMatchExpansion } from "./hooks/Matchs/ui";
```

### Import spécialisé

```jsx
import { usePlayerStats } from "./hooks/Matchs/calculations/usePlayerStats";
```

### Exemple d'utilisation dans un composant

```jsx
const MatchComponent = ({ matchData, latestPatch }) => {
  // Hook principal pour les données
  const gameAssets = useGameAssets(latestPatch);

  // Hook combiné pour tous les calculs
  const matchCalculations = useMatchCalculations();

  // Ou hooks spécialisés si besoin
  const playerStats = usePlayerStats();
  const matchUtils = useMatchUtils();

  // Hook d'interface
  const matchExpansion = useMatchExpansion();

  // Utilisation...
};
```

## 🚀 Rétrocompatibilité

- ✅ **Tous les imports existants** continuent de fonctionner
- ✅ **Nouveaux imports organisés** disponibles
- ✅ **API inchangée** pour les hooks existants
- ✅ **Migration progressive** possible

## 🔮 Extensibilité future

Cette structure permet facilement d'ajouter :

- **Nouveaux calculs** dans `calculations/`
- **Nouvelles sources de données** dans `data/`
- **Nouveaux états UI** dans `ui/`
- **Hooks composés** combinant plusieurs catégories
