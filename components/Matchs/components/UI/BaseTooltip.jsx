import { useState, memo } from "react";

const BaseTooltip = ({ children, content, disabled = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  if (disabled) return children;

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
            {content}
          </div>
          {/* Flèche du tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(BaseTooltip);
