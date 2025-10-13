import Image from "next/image";

export const LoadingState = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <Image
        src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-sleeping-poro.png"
        alt="Poro sleeping"
        width={70}
        height={70}
        className="animate-pulse"
      />
      <p className="ml-4 text-white">Loading data...</p>
    </div>
  );
};
