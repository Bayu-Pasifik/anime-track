import React from "react";
import Skeleton from "react-loading-skeleton"; // Install react-loading-skeleton or any other skeleton loader library

const SkeletonContent: React.FC = () => {
  return (
    <div className="p-4">
      <Skeleton height={600} width="100%" />
      <div className="mt-4 flex flex-col lg:flex-row">
        <div className="lg:w-1/3 w-full">
          <Skeleton height={600} width="100%" />
        </div>
        <div className="lg:w-2/3 w-full lg:ml-4">
          <Skeleton height={600} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonContent;
