const SkeletonListTile: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-slate-800 h-auto w-full rounded-lg shadow-lg animate-pulse">
      {/* Leading Skeleton */}
      <div className="mr-4 flex-shrink-0">
        <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
      </div>

      {/* Title and Subtitle Skeleton */}
      <div className="flex flex-col flex-grow space-y-2">
        <div className="w-3/4 h-4 bg-slate-700 rounded"></div>
        <div className="w-1/2 h-4 bg-slate-700 rounded"></div>
      </div>

      {/* Trailing Skeleton */}
      <div className="ml-4 flex flex-row items-center space-x-4">
        <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
        <div className="w-6 h-6 bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonListTile;
