import React from "react";

interface ListCardProps {
  genres: string[]; // Array of genre names
  synopsis: string;
  imageUrl: string;
  title: string;
}

const ListCard: React.FC<ListCardProps> = ({ genres, synopsis, imageUrl, title }) => {
  return (
    <div className="flex flex-row sm:flex-row bg-gray-100 rounded-lg overflow-hidden lg:flex-row lg:max-w-full">
      {/* Genre section (hidden on small screens) */}
      <div className="hidden sm:flex sm:flex-col  bg-gray-800 p-4 text-white w-full sm:w-1/12 sm:items-center sm:justify-start">
        <div className="flex flex-col items-start space-y-6 sm:space-y-4 sm:items-center">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="text-lg text-left sm:text-base [writing-mode:vertical-lr] rotate-180 underline decoration-2 decoration-blue-500"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="w-full sm:w-3/4 p-4 bg-yellow-100 flex flex-col justify-center">
        {/* Synopsis section */}
        <div>
          <h1 className="text-2xl font-bold mb-2 sm:text-3xl">{title}</h1>
          <h2 className="text-lg font-semibold mb-2 sm:text-xl">Synopsis</h2>
          <p className="text-gray-700 text-sm sm:text-base line-clamp-3">{synopsis}</p>
        </div>
      </div>

      {/* Image section */}
      <div className="w-full sm:w-1/6 flex sm:justify-end">
        <img
          src={imageUrl}
          alt="Anime"
          className="object-cover w-full h-48 sm:w-72 sm:h-auto"
        />
      </div>
    </div>
  );
};

export default ListCard;
