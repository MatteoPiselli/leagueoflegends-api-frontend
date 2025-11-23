import {
  ChampionInfo,
  PlayerRunes,
  PlayerSpells,
  PlayerItems,
} from "./components";

const PlayerMatchInfo = ({
  currentPlayer,
  latestPatch,
  getChampionId,
  gameAssets,
  matchDataHook,
}) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      {/* Champion icon and level */}
      <ChampionInfo
        currentPlayer={currentPlayer}
        latestPatch={latestPatch}
        getChampionId={getChampionId}
      />

      {/* Runes and Summoner Spells */}
      <div className="flex flex-col items-center space-y-1">
        <PlayerRunes currentPlayer={currentPlayer} gameAssets={gameAssets} />

        <PlayerSpells
          currentPlayer={currentPlayer}
          latestPatch={latestPatch}
          gameAssets={gameAssets}
        />
      </div>

      {/* Items */}
      <PlayerItems
        currentPlayer={currentPlayer}
        latestPatch={latestPatch}
        gameAssets={gameAssets}
        matchDataHook={matchDataHook}
      />
    </div>
  );
};

export default PlayerMatchInfo;
