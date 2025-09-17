import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { REGIONS, DEFAULT_REGION } from "../data/regions";

export const RegionDropdown = ({ onRegionSelect, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(
    REGIONS.find((r) => r.code === DEFAULT_REGION) || REGIONS[0]
  );

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setIsOpen(false);
    onRegionSelect?.(region);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={disabled}
        className="flex items-center space-x-1 px-4 py-2 text-white rounded-lg bg-[#DD1129] hover:bg-[#b30d23] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image
          src={selectedRegion.image}
          alt={selectedRegion.code}
          width={30}
          height={30}
          className="rounded-sm"
        />
        <span className="text-sm">{selectedRegion.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 -ml-16 mt-2 bg-[#2a2a2a] border border-[#DD1029] rounded-lg shadow-lg z-50"
          >
            {/* Arrow pointing up */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#DD1029]"></div>
              <div className="absolute top-[1px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[7px] border-l-transparent border-r-transparent border-b-[#2a2a2a]"></div>
            </div>

            <div className="p-2 min-w-[200px]">
              <div className="text-gray-300 text-sm font-medium mb-2 px-2">
                Select Region
              </div>
              {REGIONS.map((region) => (
                <div
                  key={region.code}
                  className={`p-1 hover:bg-[#3a3a3a] cursor-pointer text-white rounded ${
                    selectedRegion.code === region.code ? "bg-[#3a3a3a]" : ""
                  }`}
                  onClick={() => handleRegionSelect(region)}
                >
                  <div className="flex items-center space-x-1">
                    <Image
                      src={region.image}
                      alt={region.name}
                      width={30}
                      height={30}
                      className="rounded-sm"
                    />
                    <span>
                      {region.name} ({region.code})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
