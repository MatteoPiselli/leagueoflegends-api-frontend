# Core Components

The Core module contains the fundamental components for the League of Legends player search application.

## Directory Structure

```
Core/
├── components/                     # Core components
│   ├── index.js                   # Component exports
│   ├── Search/                    # Search functionality
│   │   ├── index.js
│   │   ├── components/            # Search UI components
│   │   │   ├── SearchForm.jsx     # Main search form with input and button
│   │   │   ├── RegionDropdown.jsx # Region selection dropdown
│   │   │   └── SearchHistory.jsx  # Search history display with animations
│   │   ├── hooks/                 # Search-specific hooks
│   │   │   ├── useSearchForm.js   # Form logic and validation
│   │   │   └── useSearchHistory.js # History display logic
│   │   ├── utils/                 # Search utilities
│   │   │   └── utils.js           # Input parsing, validation, formatting
│   │   └── data/                  # Search static data
│   │       └── regions.js         # Region configuration
│   ├── Profile/                   # Player profile components
│   │   ├── index.js
│   │   └── PlayerProfile.jsx      # Main profile display component
│   └── UI/                        # Shared UI components
│       ├── index.js
│       └── LoadingState.jsx       # Loading spinner/animation component
├── index.js                       # Main export file
└── README.md                      # This file
```

## Components Overview

### 🔍 Search Module

**Location**: `components/Search/`

Handles all search-related functionality including input forms, region selection, and search history.

#### Components:

- **SearchForm.jsx** - Main search form with input validation and submit functionality
- **RegionDropdown.jsx** - Region selection dropdown (EUW, NA, KR, EUNE, etc.)
- **SearchHistory.jsx** - Search history display with animations and click-to-search

#### Hooks:

- **useSearchForm.js** - Form logic, validation, and state management
- **useSearchHistory.js** - History display logic and interactions

#### Utils:

- **utils.js** - Input parsing, validation, and formatting utilities

#### Data:

- **regions.js** - Region configuration (REGIONS, DEFAULT_REGION)

#### Key Features:

- ✅ Username#TagLine input validation
- ✅ Real-time search history with click-to-search
- ✅ Region selection with visual flags
- ✅ Form state management and reset
- ✅ Modular architecture with separated concerns

### 👤 Profile Module

**Location**: `components/Profile/`

Displays player profile information after a successful search.

- **PlayerProfile.jsx** - Main profile display component with player information

### 🎨 UI Module

**Location**: `components/UI/`

Shared UI components used across the application.

- **LoadingState.jsx** - Loading spinner/animation component for async operations

## Architecture Principles

### 🏗️ **Modular Design**

Each component has a single responsibility and is easily testable.

### 🔗 **Hook-Based Logic**

Business logic is extracted into custom hooks for reusability across components.

### 📁 **Domain Separation**

Components are organized by feature domain (Search, Profile, UI) for better maintainability.

### 🎯 **Clean Interfaces**

Components expose minimal, well-defined props interfaces for better API design.

### 📦 **Export Structure**

Each module exports its public API through index.js files for clean imports.

### 🔄 **Separation of Concerns**

- **Components**: UI rendering and user interactions
- **Hooks**: State management and business logic
- **Utils**: Pure functions for data processing
- **Data**: Static configuration and constants

## Dependencies

- **React** - Component framework and hooks
- **Next.js** - Framework features (Image component, routing)
- **Framer Motion** - Animations for search history and transitions
- **Lucide React** - Icons for UI elements
- **Tailwind CSS** - Utility-first CSS styling
