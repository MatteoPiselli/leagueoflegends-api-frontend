import { useState } from "react";
import Image from "next/image";

const SpellTooltip = ({ latestPatch, spell, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!spell) return children;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-[#121212] border border-gray-700 rounded-lg p-3 max-w-sm w-80 shadow-xl">
            {/* Spell Image and Name */}
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/${spell.id}.png`}
                alt={spell.name}
                width={32}
                height={32}
                className="rounded"
              />
              <h4 className="text-yellow-400 font-semibold text-sm">
                {spell.name}
              </h4>
            </div>

            {/* Cooldown */}
            {spell.cooldown && spell.cooldown[0] && (
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-blue-400">
                  Cooldown: {spell.cooldown[0]}s
                </span>
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
          </div>

          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpellTooltip;
