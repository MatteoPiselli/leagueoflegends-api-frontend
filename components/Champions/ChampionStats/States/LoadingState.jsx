import Image from "next/image";

export const LoadingState = () => (
  <div className="h-fit w-full p-4 bg-[#19191B] rounded-lg">
    <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#dd1029]">
      <h2 className="text-base text-white font-semibold">Champions Stats</h2>
    </div>
    <div className="flex items-center justify-center py-8">
      <Image
        src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-search-empty-poro.svg"
        alt="Loading poro"
        width={40}
        height={40}
        className="animate-pulse"
      />
      <span className="ml-3 text-gray-400 text-sm">Loading statistics...</span>
    </div>
  </div>
);
