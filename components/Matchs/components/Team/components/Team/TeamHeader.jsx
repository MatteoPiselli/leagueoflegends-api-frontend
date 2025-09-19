import { memo } from "react";

const TeamHeader = ({ team }) => {
  return (
    <h4 className={`text-sm font-semibold ${team.color} mb-2`}>
      {team.name}
    </h4>
  );
};

export default memo(TeamHeader);