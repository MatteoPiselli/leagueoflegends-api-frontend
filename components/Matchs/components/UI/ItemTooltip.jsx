import { useState } from "react";
import Image from "next/image";

// ---------- Item Tooltip component ---------- //
export default function ItemTooltip({ latestPatch, itemId, item, children }) {
  const [isVisible, setIsVisible] = useState(false);

  if (!item) return children;

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
            {/* --------------- Item Image --------------- */}
            <div className="flex items-center gap-2 mb-2">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/${itemId}.png`}
                alt={item.name}
                width={40}
                height={40}
                className="rounded"
              />
              <h4 className="text-yellow-400 font-semibold text-sm">
                {item.name}
              </h4>
            </div>
            {item.gold && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-yellow-500">{item.gold.total}g</span>
              </div>
            )}
            {/*--------------- Description HTML without tags -------------*/}
            {item.description && (
              <p
                className="text-xs text-gray-300 mt-2"
                dangerouslySetInnerHTML={{
                  __html: item.description
                    .replace(/<br>/g, "<br/>")
                    .replace(/<stats>/g, '<div class="text-blue-400 mt-1">')
                    .replace(/<\/stats>/g, "</div>")
                    .replace(
                      /<passive>/g,
                      '<div class="text-green-400 mt-1"><strong>Passif:</strong>'
                    )
                    .replace(/<\/passive>/g, "</div>")
                    .replace(
                      /<active>/g,
                      '<div class="text-orange-400 mt-1"><strong>Actif:</strong>'
                    )
                    .replace(/<\/active>/g, "</div>"),
                }}
              />
            )}
          </div>
          {/* Flèche du tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}
