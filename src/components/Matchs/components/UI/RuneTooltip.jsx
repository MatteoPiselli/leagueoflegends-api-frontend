import { memo } from "react";
import Image from "next/image";
import BaseTooltip from "./BaseTooltip";

const RuneTooltip = ({ rune, children }) => {
  // Early return if no rune data
  if (!rune) {
    return children;
  }

  const content = (
    <>
      {/* Rune Image and Name */}
      <div className="flex items-center gap-3 mb-2">
        <Image
          src={rune.icon}
          alt={rune.name}
          width={32}
          height={32}
          className="rounded"
        />
        <h4 className="text-yellow-400 font-semibold text-sm">{rune.name}</h4>
      </div>

      {/* Short Description */}
      {rune.shortDesc && (
        <p
          className="text-gray-300 text-xs mb-2 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: rune.shortDesc
              .replace(/<br\s*\/?>/gi, "<br/>")
              .replace(/<[^>]+>/g, ""),
          }}
        />
      )}
    </>
  );

  return <BaseTooltip content={content}>{children}</BaseTooltip>;
};

export default memo(RuneTooltip);
