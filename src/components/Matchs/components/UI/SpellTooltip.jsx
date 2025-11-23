import { memo } from "react";
import Image from "next/image";
import BaseTooltip from "./BaseTooltip";

const SpellTooltip = ({ latestPatch, spell, children }) => {
  // Early return if no spell data
  if (!spell) {
    return children;
  }

  const content = (
    <>
      {/* Spell Image and Name */}
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell.id}.png`}
          alt={spell.name}
          width={32}
          height={32}
          className="rounded"
        />
        <h4 className="text-yellow-400 font-semibold text-sm">{spell.name}</h4>
      </div>

      {/* Cooldown */}
      {spell.cooldown && spell.cooldown[0] && (
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-blue-400">Cooldown: {spell.cooldown[0]}s</span>
        </div>
      )}

      {/* Description */}
      {spell.description && (
        <p
          className="text-xs text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: spell.description
              .replace(/<br\s*\/?>/gi, "<br/>")
              .replace(/<[^>]+>/g, ""),
          }}
        />
      )}
    </>
  );

  return <BaseTooltip content={content}>{children}</BaseTooltip>;
};

export default memo(SpellTooltip);
