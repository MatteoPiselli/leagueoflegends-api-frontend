# Structure organisée des hooks Matchs

## 📁 Nouvelle organisation du dossier `hooks/`

```
hooks/
├── index.js (exports centralisés)
├── data/                    # 📊 Hooks de gestion des données
│   ├── index.js
│   └── useGameAssets.js     # Runes, sorts, objets depuis l'API Riot
├── calculations/            # 🧮 Hooks de calculs et utilitaires
│   ├── index.js
│   ├── useMatchCalculations.js   # Hook principal combinant tous les calculs
│   ├── usePlayerStats.js         # Calculs spécifiques au joueur (KDA, CS)
│   └── useMatchUtils.js          # Utilitaires de match (durée, équipes)
└── ui/                      # 🎨 Hooks d'interface utilisateur
    ├── index.js
    └── useMatchExpansion.js # Gestion de l'expansion des détails de match
```

## 🎯 Logique d'organisation

### 📊 **data/** - Hooks de données

### Data Hooks (`hooks/data/`)

- **useGameAssets**: Fetches champion, spell, rune, and item data from Data Dragon API
- **useMatchData**: Provides utilities for:
  - Player items extraction from match data
  - Player data extraction by PUUID
  - Team composition analysis
  - Match timeline events filtering
  - Champion ban data extraction
  - Chargement en parallèle des données depuis l'API Riot
  - Fonctions helper pour récupérer des données spécifiques
  - Gestion des états de chargement et d'erreur

### 🧮 **calculations/** - Hooks de calculs

- `useMatchCalculations.js` : Hook principal qui combine tous les calculs
- `usePlayerStats.js` : Calculs spécifiques aux statistiques de joueur
  - Calcul du KDA et coloration
  - Calcul des CS et CS/min
  - Récupération des objets du joueur
- `useMatchUtils.js` : Utilitaires généraux pour les matchs
  - Formatage de la durée du match
  - Traitement des participants
  - Séparation des équipes

### 🎨 **ui/** - Hooks d'interface

- `useMatchExpansion.js` : Gestion de l'état d'expansion des détails de match
  - Toggle de l'expansion par match
  - État global des matchs expandés
  - Fonction pour refermer tous les matchs

## 📈 Avantages de cette organisation

### 🔍 **Spécialisation et clarté**

- **Responsabilité unique** : Chaque hook a une fonction claire
- **Réutilisabilité** : Les hooks spécialisés peuvent être utilisés indépendamment
- **Tests ciblés** : Chaque hook peut être testé séparément

### 🔄 **Composition et flexibilité**

- **Hook principal** : `useMatchCalculations` combine tous les calculs
- **Hooks spécialisés** : Peuvent être utilisés individuellement si besoin
- **Extensibilité** : Facile d'ajouter de nouveaux calculs ou utilitaires

### 🧪 **Maintenabilité**

- **Modifications isolées** : Changements limités à leur domaine
- **Code DRY** : Évite la duplication de logique
- **Structure modulaire** : Facilite les refactorisations futures

## 🔧 Utilisation des hooks

### Import groupé (recommandé)

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
