# Structure organisée des composants Matchs

## 📁 Nouvelle organisation du dossier `components/`

```
components/
├── index.js (exports centralisés)
├── Match/           # 🎮 Composants spécifiques aux matchs
│   ├── index.js
│   ├── MatchCard.jsx       # Carte principale d'un match
│   └── MatchHeader.jsx     # En-tête (queue, victoire, durée)
├── Player/          # 👤 Composants spécifiques aux joueurs
│   ├── index.js
│   ├── PlayerMatchInfo.jsx # Infos joueur (champion, runes, sorts)
│   └── PlayerStats.jsx     # Statistiques (KDA, CS, objets)
├── Team/            # 🏃‍♂️ Composants spécifiques aux équipes
│   ├── index.js
│   ├── TeamColumn.jsx      # Colonne d'équipe
│   └── Participants.jsx    # Affichage détaillé des participants
├── UI/              # 🎨 Composants d'interface réutilisables
│   ├── index.js
│   ├── ItemTooltip.jsx     # Tooltip pour les objets
│   ├── RuneTooltip.jsx     # Tooltip pour les runes
│   └── SpellTooltip.jsx    # Tooltip pour les sorts
└── States/          # 📊 Composants d'état
    ├── index.js
    └── EmptyMatchState.jsx # État vide/retry
```

## 🎯 Logique d'organisation

### 📂 **Match/** - Composants de match

- `MatchCard.jsx` : Composant principal qui orchestre l'affichage d'un match
- `MatchHeader.jsx` : Informations générales du match (type, résultat, durée)

### 👤 **Player/** - Composants de joueur

- `PlayerMatchInfo.jsx` : Informations visuelles du joueur (champion, runes, sorts)
- `PlayerStats.jsx` : Statistiques de performance (KDA, CS, objets)

### 🏃‍♂️ **Team/** - Composants d'équipe

- `TeamColumn.jsx` : Affichage compact des équipes
- `Participants.jsx` : Vue détaillée des participants

### 🎨 **UI/** - Interface réutilisable

- `ItemTooltip.jsx` : Tooltip pour afficher les détails des objets
- `RuneTooltip.jsx` : Tooltip pour afficher les détails des runes
- `SpellTooltip.jsx` : Tooltip pour afficher les détails des sorts

### 📊 **States/** - États de l'application

- `EmptyMatchState.jsx` : Gestion de l'état vide avec possibilité de retry

## 📈 Avantages de cette organisation

### 🔍 **Clarté et navigation**

- **Séparation logique** : Chaque dossier a une responsabilité claire
- **Recherche facilitée** : Plus facile de trouver un composant spécifique
- **Structure intuitive** : L'organisation reflète le domaine métier

### 🔄 **Réutilisabilité**

- **Composants UI** : Les tooltips peuvent être réutilisés ailleurs
- **Composants métier** : Logique séparée et réutilisable
- **Imports simplifiés** : Grâce aux fichiers index.js

### 🧪 **Maintenabilité**

- **Tests ciblés** : Chaque catégorie peut être testée séparément
- **Modifications isolées** : Changements limités à leur domaine
- **Évolutivité** : Facile d'ajouter de nouveaux composants

## 🔧 Utilisation des imports

### Import depuis l'extérieur

```jsx
import {
  MatchCard,
  PlayerStats,
  ItemTooltip,
  EmptyMatchState,
} from "./components/Matchs";
```

### Import par catégorie

```jsx
import { MatchCard, MatchHeader } from "./components/Match";
import { PlayerMatchInfo, PlayerStats } from "./components/Player";
import { ItemTooltip, RuneTooltip } from "./components/UI";
```

### Import direct

```jsx
import { ItemTooltip } from "./components/Matchs/components/UI";
```

## 🚀 Migration et rétrocompatibilité

- ✅ **Tous les imports existants** continuent de fonctionner
- ✅ **Nouveaux imports organisés** disponibles
- ✅ **Pas de breaking changes** dans l'API existante
- ✅ **Documentation mise à jour** pour les nouveaux patterns
