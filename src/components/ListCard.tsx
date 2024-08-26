import React from "react";

interface ListCardProps {
  image: string;
  title: string;
  description?: string;
}

const ListCard: React.FC<ListCardProps> = ({ image, title, description }) => {
  return (
    <div className="p-4 h-72 w-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-52 w-40 rounded-lg object-cover"
      />
      <h2 className="text-sm font-bold text-white line-clamp-2 overflow-hidden text-center">
        {title}
      </h2>
      <p className="text-sm text-center text-white mt-1 truncate">( {description} )</p>
    </div>
  );
};

export default ListCard;
