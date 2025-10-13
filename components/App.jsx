// Import Next
import Image from "next/image";

// Import components
import Ranked from "./Ranked/Ranked";
import Matchs from "./Matchs/Matchs";
import Champions from "./Champions/Champions";
import Masteries from "./Masteries/Masteries";
import {
  SearchForm,
  PlayerProfile,
  LoadingState,
  ErrorState,
  WelcomeState,
} from "./Core";

// Import custom hooks
import { usePlayerData, useChampionData } from "../hooks";

export default function App() {
  // Use custom hooks
  const {
    playerData,
    rankedData,
    matchData,
    masteriesData,
    isLoading,
    error,
    searchPlayer,
    retryMatches,
    retryMasteries,
  } = usePlayerData();

  const { latestPatch, getChampionName } = useChampionData();

  return (
    <div className="relative min-h-screen text-white">
      {/* Background Image */}
      <div className="z-10 w-full h-full bg-black opacity-35 absolute inset-0" />
      <Image src="/background.jpg" alt="Background" layout="fill" />

      {/* Main Container */}
      <div className="z-20 container max-w-5xl mx-auto px-8 absolute inset-0 bg-[#121212] rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">
        <div className="flex justify-center mt-8">
          {/* Logo */}
          <Image
            priority={true}
            src="/logo.png"
            alt="logo SummonerFinder.gg"
            width={300}
            height={110}
          />
        </div>

        {/* Search Form */}
        <SearchForm onSearch={searchPlayer} isLoading={isLoading} />

        {isLoading ? (
          <LoadingState />
        ) : playerData ? (
          <>
            {/* Player Profile */}
            <PlayerProfile playerData={playerData} latestPatch={latestPatch} />

            {/* Components */}
            <div className="flex space-x-6 mt-6">
              <div className="flex flex-col space-y-6 w-1/3 mb-16">
                <Ranked rankedData={rankedData} />
                <Champions
                  playerData={playerData}
                  latestPatch={latestPatch}
                  getChampionName={getChampionName}
                />
                <Masteries
                  latestPatch={latestPatch}
                  masteriesData={masteriesData}
                  getChampionName={getChampionName}
                  retryMasteries={retryMasteries}
                />
              </div>
              <div className="w-2/3">
                <Matchs
                  latestPatch={latestPatch}
                  playerData={playerData}
                  matchData={matchData}
                  searchPlayer={searchPlayer}
                  getChampionName={getChampionName}
                  retryMatches={retryMatches}
                />
              </div>
            </div>
          </>
        ) : error ? (
          <ErrorState error={error} onRetry={() => window.location.reload()} />
        ) : (
          <WelcomeState />
        )}
      </div>
    </div>
  );
}
