import Image from "next/image";
import {
  SearchForm,
  PlayerProfile,
  LoadingState,
  ErrorState,
  WelcomeState,
  ApiLimitBanner,
} from "../../components/Core";
import Ranked from "../../components/Ranked/Ranked";
import Matchs from "../../components/Matchs/Matchs";
import Champions from "../../components/Champions/Champions";
import Masteries from "../../components/Masteries/Masteries";
import { usePlayerData } from "../../hooks";

export default function IndexPage() {
  const {
    playerData,
    rankedData,
    matchData,
    masteriesData,
    isLoading,
    error,
    searchPlayer,
    retryMatches,
  } = usePlayerData();

  return (
    <div className="relative min-h-screen text-white">
      {/* Background */}
      <div className="z-10 w-full h-full bg-black opacity-35 absolute inset-0" />
      <Image src="/background.jpg" alt="Background" layout="fill" />

      {/* Main Container */}
      <div className="z-20 container max-w-5xl mx-auto px-8 absolute inset-0 bg-[#121212] rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-[#DD1029] scrollbar-track-[#121212]">
        {/* Logo */}
        <div className="flex justify-center mt-8">
          <Image
            priority
            src="/logo.png"
            alt="logo SummonerFinder.gg"
            width={300}
            height={110}
          />
        </div>

        <SearchForm onSearch={searchPlayer} isLoading={isLoading} />
        <ApiLimitBanner />

        {isLoading ? (
          <LoadingState />
        ) : playerData ? (
          <>
            <PlayerProfile playerData={playerData} />
            <div className="flex space-x-6 mt-6">
              <div className="flex flex-col space-y-6 w-1/3 mb-16">
                <Ranked rankedData={rankedData} />
                <Champions playerData={playerData} />
                <Masteries masteriesData={masteriesData} />
              </div>
              <div className="w-2/3">
                <Matchs
                  playerData={playerData}
                  matchData={matchData}
                  searchPlayer={searchPlayer}
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
