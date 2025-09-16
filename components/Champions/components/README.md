# Champions Components

This directory contains all UI components for the Champions feature, organized by domain and functionality.

## Structure

### ChampionStats/

Contains components related to displaying champion statistics:

- `ChampionCard.jsx` - Individual champion performance card with KDA, win rate, and match count

### States/

Contains components for different application states:

- `EmptyState.jsx` - Displayed when no champion data is available
- `ErrorState.jsx` - Shown when API requests fail, includes retry functionality
- `LoadingState.jsx` - Loading indicator while fetching champion data

## Usage Examples

```jsx
import { ChampionCard } from "./ChampionStats";
import { LoadingState, ErrorState, EmptyState } from "./States";

// Using state components
if (loading) return <LoadingState />;
if (error) return <ErrorState error={error} onRetry={refetch} />;
if (!data.length) return <EmptyState />;

// Using ChampionCard
<ChampionCard
  champion={championData}
  latestPatch="13.1.1"
  getChampionName={getChampionName}
/>;
```

## Design Principles

- **Single Responsibility**: Each component has one clear purpose
- **Reusability**: Components can be used across different contexts
- **Consistency**: All components follow the same design patterns and styling
- **Accessibility**: Components include proper ARIA labels and semantic HTML
