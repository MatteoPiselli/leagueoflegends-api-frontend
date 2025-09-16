import { useState } from "react";
import Image from "next/image";

const EmptyMatchState = ({ playerData, retryMatches }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleRetry = async () => {
    setIsClicked(true);
    await retryMatches();
    setIsClicked(false);
  };

  return (
    <div className="w-full h-[200px] flex flex-col space-y-4 justify-center items-center border border-[#dd1029] rounded-lg mt-8">
      <Image
        src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-shocked-poro-clear.png"
        alt="No match data"
        width={52}
        height={52}
        className="opacity-50 brightness-50 invert"
      />

      <p className="text-lg font-semibold">
        Not enough recent games to display matches.
      </p>

      {playerData?.summoner?.puuid && (
        <button
          onClick={handleRetry}
          className={`${
            isClicked ? "animate-pulse" : ""
          } px-4 py-2 bg-[#dd1029] text-white rounded hover:bg-[#b91027] transition-colors`}
        >
          {isClicked ? "Loading..." : "Retry"}
        </button>
      )}
    </div>
  );
};

export default EmptyMatchState;
