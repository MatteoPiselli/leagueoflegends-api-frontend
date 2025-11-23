# Refactorisation du dossier Matchs

## 📁 Structure après refactorisation

```
Matchs/
├── Matchs.jsx (composant principal simplifié)
├── index.js (exports centralisés)
├── hooks/
│   ├── useGameAssets.js      # Gestion runes, sorts, objets
│   ├── useMatchCalculations.js # Calculs KDA, CS, durée
│   └── useMatchExpansion.js   # État d'expansion des matchs
└── components/
    ├── MatchCard.jsx         # Carte d'un match individuel
    ├── MatchHeader.jsx       # En-tête du match (queue, victoire/défaite, durée)
    ├── PlayerMatchInfo.jsx   # Infos joueur (champion, runes, sorts)
    ├── PlayerStats.jsx       # Statistiques (KDA, CS, objets)
    ├── EmptyMatchState.jsx   # État vide/retry
    └── [composants existants...] # ItemTooltip, TeamColumn, etc.
```

## 🎯 Composants refactorisés

### 📦 Hooks personnalisés

#### `useGameAssets(latestPatch)`

- **But**: Récupérer et gérer les données de runes, sorts et objets
- **Retourne**:
  - `runesData`, `summonerSpells`, `itemsData`
  - `getRuneData()`, `getRuneTreeData()`, `getSummonerSpell()`, `getItemData()`
  - `loading`, `error`

#### `useMatchCalculations()`

- **But**: Fonctions utilitaires pour les calculs de match
- **Retourne**:
  - `calculateKDA()`, `calculateCS()`, `formatGameDuration()`
  - `getKDAColor()`, `getPlayerItems()`, `processParticipants()`, `splitTeams()`

#### `useMatchExpansion()`

- **But**: Gérer l'état d'expansion des détails de match
- **Retourne**:
  - `expandedMatches`, `toggleMatchDetails()`, `isMatchExpanded()`

### 🧩 Composants

#### `MatchCard`

- **But**: Composant principal pour afficher un match
- **Props**: `match`, `playerData`, `latestPatch`, `searchPlayer`, `getChampionName`, hooks

#### `MatchHeader`

- **But**: Afficher les informations d'en-tête (type de queue, victoire/défaite, durée)
- **Props**: `match`, `currentPlayer`

#### `PlayerMatchInfo`

- **But**: Afficher les informations du joueur (champion, runes, sorts)
- **Props**: `currentPlayer`, `latestPatch`, `getChampionName`, `gameAssets`, `matchCalculations`

#### `PlayerStats`

- **But**: Afficher KDA, CS et objets
- **Props**: `currentPlayer`, `latestPatch`, `gameAssets`, `matchCalculations`, `gameDuration`

#### `EmptyMatchState`

- **But**: Gérer l'état vide et le bouton retry
- **Props**: `playerData`, `retryMatches`

## 📈 Avantages de la refactorisation

- **🧹 Code plus propre**: Matchs.jsx passe de ~400 lignes à ~35 lignes
- **🔄 Réutilisabilité**: Les hooks peuvent être utilisés dans d'autres composants
- **🧪 Testabilité**: Chaque hook/composant peut être testé individuellement
- **📚 Maintenabilité**: Logique séparée par responsabilité
- **🚀 Performance**: Chargement des assets en parallèle, gestion d'erreurs améliorée

## 🔧 Utilisation

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
