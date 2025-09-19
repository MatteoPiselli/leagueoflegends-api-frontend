import { memo } from "react";

const PlayerKDA = ({ kills, deaths, assists }) => {
  return (
    <span className="text-gray-400 ml-2">
      {kills}/{deaths}/{assists}
    </span>
  );
};

export default memo(PlayerKDA);