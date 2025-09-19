// Export all hooks organized by category

// Data hooks
export * from "./data";

// Calculation hooks
export * from "./calculations";

// UI hooks
export * from "./ui";

// Backward compatibility - maintain existing exports
export { useGameAssets } from "./data/useGameAssets";
export { useMatchExpansion } from "./ui/useMatchExpansion";
