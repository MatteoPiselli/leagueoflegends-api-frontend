import Image from "next/image";
import { ItemTooltip, RuneTooltip, SpellTooltip } from "../UI";

const PlayerMatchInfo = ({
  currentPlayer,
  latestPatch,
  getChampionName,
  gameAssets,
  matchData_hook,
  matchCalculations,
  matchDisplay,
}) => {
  const { getRuneData, getRuneTreeData, getSummonerSpell, getItemData } =
    gameAssets;
  const { getPlayerItems } = matchData_hook;
  const { calculateKDA, calculateCS } = matchCalculations;
  const { getKDAColor } = matchDisplay;

  // Get rune data for the current player
  const primaryRuneData = getRuneData(
    currentPlayer?.perks?.styles?.[0]?.selections?.[0]?.perk
  );
  const primaryRuneIcon = primaryRuneData?.icon;

  const secondaryRuneTreeData = getRuneTreeData(
    currentPlayer?.perks?.styles?.[1]?.style
  );
  const secondaryRuneIcon = secondaryRuneTreeData?.icon;

  // Get summoner spells
  const spell1 = getSummonerSpell(currentPlayer.summoner1Id);
  const spell2 = getSummonerSpell(currentPlayer.summoner2Id);

  // Calculate stats
  const kda = calculateKDA(
    currentPlayer.kills,
    currentPlayer.deaths,
    currentPlayer.assists
  );
  const { cs, csPerMin } = calculateCS(
    currentPlayer.totalMinionsKilled,
    currentPlayer.neutralMinionsKilled,
    120 // Placeholder - should get from match duration
  );
  const playerItems = getPlayerItems(currentPlayer);

  return (
    <div className="flex flex-row items-center space-x-2">
      {/* Champion icon and level */}
      <div className="relative w-[60px] h-[60px] mt-2">
        <div className="flex items-center space-x-4 rounded-md overflow-hidden w-[50px] h-[50px]">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/${getChampionName(
              currentPlayer.championId
            )}.png`}
            alt={currentPlayer.championName}
            width={50}
            height={50}
            className="scale-[1.2]"
          />
          <span className="absolute right-0 bottom-0 bg-[#121212] text-white text-xs p-1 rounded-full">
            {currentPlayer.champLevel}
          </span>
        </div>
      </div>

      {/* Runes and Summoner Spells */}
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          {primaryRuneData && (
            <RuneTooltip rune={primaryRuneData}>
              <Image
                src={primaryRuneIcon}
                alt="Primary Rune"
                width={24}
                height={24}
                className="hover:scale-110 transition-transform"
              />
            </RuneTooltip>
          )}

          {secondaryRuneTreeData && (
            <RuneTooltip rune={secondaryRuneTreeData}>
              <Image
                src={secondaryRuneIcon}
                alt="Secondary Rune Tree"
                width={20}
                height={20}
                className="hover:scale-110 transition-transform"
              />
            </RuneTooltip>
          )}
        </div>
        <div className="flex items-center">
          {spell1 && (
            <SpellTooltip spell={spell1} latestPatch={latestPatch}>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell1.id}.png`}
                alt={spell1.name}
                width={24}
                height={24}
                className="rounded-lg hover:scale-110 transition-transform"
              />
            </SpellTooltip>
          )}
          {spell2 && (
            <SpellTooltip spell={spell2} latestPatch={latestPatch}>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell2.id}.png`}
                alt={spell2.name}
                width={24}
                height={24}
                className="rounded-lg hover:scale-110 transition-transform"
              />
            </SpellTooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchInfo;
