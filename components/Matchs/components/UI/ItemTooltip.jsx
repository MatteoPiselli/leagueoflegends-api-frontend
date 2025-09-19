import { memo } from "react";
import Image from "next/image";
import BaseTooltip from "./BaseTooltip";

// ---------- Item Tooltip component ---------- //
const ItemTooltip = ({ latestPatch, itemId, item, children }) => {
  // Early return if no item data
  if (!item) {
    return children;
  }

  const content = (
    <>
      {/* --------------- Item Image and name --------------- */}
      <div className="flex items-center gap-2 mb-2">
        <Image
          src={`https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/${itemId}.png`}
          alt={item.name}
          width={40}
          height={40}
          className="rounded"
        />
        <h4 className="text-yellow-400 font-semibold text-sm">{item.name}</h4>
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
    </>
  );

  return <BaseTooltip content={content}>{children}</BaseTooltip>;
};

export default memo(ItemTooltip);
