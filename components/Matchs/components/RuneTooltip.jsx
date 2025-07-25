import { useState } from "react";
import Image from "next/image";

const RuneTooltip = ({ rune, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (!rune) return children;

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
            {/* Rune Image and Name */}
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={rune.icon}
                alt={rune.name}
                width={32}
                height={32}
                className="rounded"
              />
              <h4 className="text-yellow-400 font-semibold text-sm">
                {rune.name}
              </h4>
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

export default RuneTooltip;
