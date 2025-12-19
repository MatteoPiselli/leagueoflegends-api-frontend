# 🎮 SummonerFinder.gg - Frontend

**Next.js** web application to view League of Legends player statistics. Modern and responsive interface displaying profile, match history, champion masteries and champion performance.

## 🌟 Features

- **Player Search** - Search by username#tagline with local history
- **Complete Profile** - Level, profile icon, Solo/Duo and Flex ranks
- **Ranked Statistics** - Detailed rankings display with LP and series
- **Match History** - List of the last 20 matches with details (KDA, champions, results)
- **Champion Mastery** - Mastery levels and points for each champion
- **Champion Statistics** - KDA, winrate and performance by game mode
- **Smooth Animations** - Transitions with Framer Motion
- **Responsive Design** - Interface adapted to all screens
- **Error Handling** - Contextual error messages with retry

## 📋 Prerequisites

- **Node.js** 22+
- **Yarn** (recommended) or npm
- **Backend API** running on port 3000

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/MatteoPiselli/leagueoflegends-api-frontend.git
cd leagueoflegends-api-frontend

# Install dependencies
yarn install
```

## 🎯 Getting Started

### Development mode

```bash
yarn dev
```

The application starts on **http://localhost:3001**

## ⚙️ Configuration

### Backend Connection

The frontend connects to the backend via hardcoded URLs in hooks (`http://localhost:3000`).

**To modify the API URL**:

- Local backend: `http://localhost:3000` (default)
- Deployed backend: Modify directly in hooks (`src/hooks/data/`)

### Environment Variables (optional)

Create a `.env.local` file at the root if necessary:

```env
# Next.js configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📁 Project Structure

```
leagueoflegends-api-frontend/
├── pages/
│   ├── _app.jsx              # Next.js wrapper (global ChampionProvider)
│   └── index.jsx             # Main page (/)
├── src/
│   ├── components/           # React components
│   │   ├── Core/            # Search, Profile, UI core
│   │   ├── Champions/       # Champion statistics
│   │   ├── Masteries/       # Champion mastery
│   │   ├── Matchs/          # Match history
│   │   └── Ranked/          # Ranked statistics
│   ├── hooks/               # Custom React hooks
│   │   ├── usePlayerData.js # Main orchestrator hook
│   │   ├── data/            # API fetching hooks
│   │   └── ui/              # UI logic hooks
│   ├── contexts/            # React Context providers
│   │   └── ChampionContext.js  # Global champion data
│   ├── constants/           # Constants (queue types, etc.)
│   └── utils/               # Utilities (formatting, errors)
├── styles/
│   └── globals.css          # Global Tailwind styles
└── public/                  # Static assets
```

## 🏗️ Architecture

### Component-Driven Design

Each **functional module** follows this structure:

```
Feature/
├── Feature.jsx               # Main component
├── index.js                  # Exports
├── components/               # UI sub-components
│   ├── FeatureCard/         # Card components
│   ├── States/              # LoadingState, ErrorState, EmptyState
│   └── ui/                  # Generic components
├── hooks/                    # Custom hooks
│   ├── data/                # Fetching hooks
│   └── utils/               # Utility hooks
└── README.md                # Module documentation
```

### Data Flow

```
User Search → usePlayerData (orchestrator) → Specialized Hooks → Backend API
                                              ↓
                    Components (Champions, Masteries, Matchs, Ranked)
```

**Main hook**: `usePlayerData` (`src/hooks/usePlayerData.js`)

- Coordinates player search
- Orchestrates API calls in parallel
- Manages global state (loading, error)

### Context Pattern

**ChampionContext** provides global data:

- Latest Riot patch version
- Champion mapping (ID → Name)
- Conversion functions

```jsx
<ChampionProvider>
  <YourApp />
</ChampionProvider>
```

## 🎨 Styling

### Tailwind CSS

**Color palette**:

- Primary red: `#DD1029`
- Background: `#121212`
- Card background: `bg-zinc-800/90`
- Border: `border-zinc-700`

**Common classes**:

```jsx
// Card container
<div className="bg-zinc-800/90 rounded-lg border border-zinc-700 p-4">

// Custom scrollbar
<div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">

// Hover effect
<button className="hover:bg-zinc-700 transition-colors">
```

### Image Optimization

Use **Next.js Image** for all images:

```jsx
import Image from "next/image";

// Champions Riot CDN
<Image
  src={`https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${name}.png`}
  alt={name}
  width={60}
  height={60}
/>;
```

## 🔌 Backend API

### Used Endpoints

```
GET /api/summoner/:username/:tagline
GET /api/ranked/:puuid?updateClicked=true
GET /api/matchs/:puuid?updateClicked=true
GET /api/matchs/details/:matchId
GET /api/masteries/:puuid?updateClicked=true
GET /api/champions/:puuid/stats?updateClicked=true&queueType=400
```

### Query Parameters

- **`updateClicked=true`** - Force refresh from Riot API
- **`queueType`** - Filter by game mode:
  - `400`: Normal Draft (default)
  - `420`: Ranked Solo/Duo
  - `440`: Ranked Flex
  - `450`: ARAM

## 🌐 External APIs

### Riot Data Dragon CDN

**Champion data**:

```
https://ddragon.leagueoflegends.com/api/versions.json
https://ddragon.leagueoflegends.com/cdn/{version}/data/en_US/champion.json
```

**Assets**:

- Champions: `cdn/{patch}/img/champion/{name}.png`
- Items: `cdn/{patch}/img/item/{itemId}.png`
- Summoner spells: `cdn/{patch}/img/spell/{spellName}.png`

### Community Dragon CDN

**Mastery icons**:

```
https://raw.communitydragon.org/latest/game/assets/ux/mastery/mastery_icon_{level}.png
```

## 📦 Key Components

### SearchForm (`components/Core/Search`)

Search bar with username#tagline validation and local history.

### PlayerProfile (`components/Core/Profile`)

Displays player profile (icon, level, username).

### Ranked (`components/Ranked`)

Solo/Duo and Flex rank cards with LP and series.

### Matchs (`components/Matchs`)

History of the last 20 matches with expandable details.

### Champions (`components/Champions`)

Statistics per champion with game mode selector.

### Masteries (`components/Masteries`)

List of champion masteries with levels and points.

## 🛠️ Technologies

- **Next.js** 12.1.6 (Pages Router)
- **React** 18.1.0
- **Tailwind CSS** 3.4.13
- **Motion** (Framer Motion) 12.15.0
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 🎯 Main Hooks

### Data Hooks (`hooks/data/`)

- **`usePlayerProfile`** - Player search and profile
- **`useRankedData`** - Ranked statistics
- **`useMatchData`** - Match history
- **`useMasteriesData`** - Champion mastery
- **`useChampionStats`** - Stats per champion and queue
- **`useChampionData`** - Riot Data Dragon data

### UI Hooks (`hooks/ui/`)

- **`useSearchHistory`** - Local search history
- **`useUpdateInfo`** - Forced updates management

## 🐛 Error Handling

### Centralized Error Pattern

```javascript
import { handleHttpError } from "../utils/errorHandling";

if (!response.ok) {
  handleHttpError(response.status, response.statusText);
  setData([]);
  return;
}
```

### Loading States

All components follow this pattern:

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

## 📚 Additional Documentation

- [Component README](./src/components/) - Documentation per module
- [Hooks Documentation](./src/hooks/README.md) - Hooks guide
- [Copilot Instructions](./.github/copilot-instructions.md) - Guide for AI agents

## 🌐 Deployment

### Vercel

```
NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app
```

## 📝 Code Conventions

- **Components**: PascalCase (`ChampionCard.jsx`)
- **Hooks**: camelCase with `use` prefix (`useChampionData.js`)
- **Exports**: Each folder has an `index.js`
- **Props drilling**: Limited, use Context for global data
- **Styles**: Tailwind utility-first, no CSS modules

## 🔄 Development Workflow

1. **Backend started** on port 3000
2. **Frontend started** on port 3001 (`yarn dev`)
3. Player search → Data fetched in parallel
4. Components update automatically
5. "Update" button forces refresh from Riot API

## 🤝 Backend Integration

This frontend requires the **SummonerFinder.gg** backend:

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:3001`
- CORS automatically handled by the backend

## 📝 Important Notes

- **Next.js 12** uses **Pages Router** (not App Router)
- `_app.jsx` file wraps the entire app with `ChampionProvider`
- All data hooks use `updateClicked=true` by default
- Images optimized via `next/image` (Riot CDN + Community Dragon)

## 📄 License

Proprietary - Matteo Piselli.

## 👨‍💻 Author

**Matteo Piselli** - [MatteoPiselli](https://github.com/MatteoPiselli)

Project developed as part of my full-stack developer portfolio.

- Portfolio: [matteopiselli.dev](https://matteopiselli.dev)
- LinkedIn: [Matteo Piselli 💻📱](https://linkedin.com/in/matteo-piselli)
