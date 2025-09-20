import Image from "next/image";
import { useRankedUtils } from "../../hooks/utils/useRankedUtils";

export const UnrankedCard = ({ queueType }) => {
  const { getRankIconUrl } = useRankedUtils();

  return (
    <div className="p-3 bg-[#1e1e20] rounded-lg">
      <div className="flex items-center space-x-3 border-l-4 border-[#dd1029] pl-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <Image
            src={getRankIconUrl("UNRANKED")}
            alt="Unranked"
            width={48}
            height={48}
          />
        </div>
        <div>
          <h3 className="text-white font-medium text-sm">{queueType.label}</h3>
          <p className="text-gray-400 text-xs">Unranked</p>
        </div>
      </div>
    </div>
  );
};
