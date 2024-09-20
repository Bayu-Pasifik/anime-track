import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  imageUrl: string; 
  title: string;    
  synopsis: string;
  type: string;
  mal_id: number; 
  rating?: number | null; // Optional rating prop that could be an integer or a float
}

const Card: React.FC<CardProps> = ({ imageUrl, title, synopsis, type, mal_id, rating }) => {
  // Function to format rating conditionally
  const formattedRating = () => {
    if (rating === null || rating === undefined) return null;
    return rating % 1 === 0 ? rating : rating.toFixed(1);
  };

  return (
    <Link to={`/${type}/detail/${mal_id}`} key={mal_id}>
      <div className="relative w-full h-auto group overflow-hidden">
        {/* Rating in the top-left corner */}
        {rating !== undefined && (
          <div className="absolute top-0 left-0 bg-teal-500 text-white font-bold p-1 rounded-tr-md rounded-bl-md z-10">
            {formattedRating()}
          </div>
        )}

        <img
          className="w-72 h-72 rounded-md object-cover"
          src={imageUrl}
          alt={title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-md">
          <p className="text-white text-sm text-center line-clamp-6 overflow-hidden">
            {synopsis}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 p-2 text-center text-white group-hover:hidden">
          <h2 className="text-sm font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default Card;
