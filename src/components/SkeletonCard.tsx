const SkeletonCard: React.FC<{ type: string }> = ({ type }) => {
    return (
      <div className="p-4">
        <div className="flex flex-row justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-500 animate-pulse">
            {type === "currently"
              ? "Currently Airing"
              : type === "upcoming"
              ? "Upcoming Anime"
              : "Popular Anime"}
          </h3>
          <div className="text-2xl font-bold text-gray-500 cursor-pointer animate-pulse">
            View More
          </div>
        </div>
        <div className="flex flex-row w-full gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="relative w-52 h-64 bg-gray-300 animate-pulse rounded-md"></div>
          ))}
        </div>
      </div>
    );
  };

  export default SkeletonCard;