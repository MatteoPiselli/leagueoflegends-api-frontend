# Core Components

The Core module contains the fundamental components for the League of Legends player search application.

## Structure

```
Core/
├── components/           # Core components
│   ├── Profile/         # Player profile components
│   ├── Search/          # Search functionality
│   └── UI/              # Shared UI components
├── index.js             # Main export file
└── README.md            # This file
```

## Components Overview

### 🔍 Search Module

**Location**: `components/Search/`

Handles all search-related functionality including input forms, region selection, and search history.

#### Sub-modules:

- **`components/`** - React components

  - `SearchForm.jsx` - Main search form with input and button
  - `RegionDropdown.jsx` - Region selection dropdown (EUW, NA, KR)
  - `SearchHistory.jsx` - Search history display with animations

- **`hooks/`** - Custom React hooks

  - `useSearchForm.js` - Form logic and validation
  - `useSearchHistory.js` - History display logic (useSearchHistoryDisplay)

- **`utils/`** - Utility functions

  - `utils.js` - Input parsing, validation, and formatting

- **`data/`** - Static data
  - `regions.js` - Region configuration (REGIONS, DEFAULT_REGION)

#### Key Features:

- ✅ Username#TagLine input validation
- ✅ Real-time search history with click-to-search
- ✅ Region selection with visual flags
- ✅ Form state management and reset
- ✅ Modular architecture with separated concerns

### 👤 Profile Module

**Location**: `components/Profile/`

Displays player profile information after a successful search.

- `PlayerProfile.jsx` - Main profile display component

### 🎨 UI Module

**Location**: `components/UI/`

Shared UI components used across the application.

- `LoadingState.jsx` - Loading spinner/animation component

## Architecture Principles

### 🏗️ **Modular Design**

Each component has a single responsibility and is easily testable.

### 🔗 **Hook-Based Logic**

Business logic is extracted into custom hooks for reusability.

### 📁 **Domain Separation**

Components are organized by feature domain (Search, Profile, UI).

### 🎯 **Clean Interfaces**

Components expose minimal, well-defined props interfaces.

### 📦 **Export Structure**

Each module exports its public API through index.js files.

## Dependencies

- **React** - Component framework
- **Next.js** - Framework features (Image component)
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Tailwind CSS** - Styling
