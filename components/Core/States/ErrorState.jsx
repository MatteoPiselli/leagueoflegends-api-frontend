export function ErrorState({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center mt-12 p-8 bg-red-900/20 rounded-lg border border-red-500/30 max-w-md mx-auto">
      <div className="text-red-400 text-4xl mb-4">⚠️</div>
      <h2 className="text-xl text-red-400 font-semibold mb-2">Erreur</h2>
      <p className="text-gray-300 text-center mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
}