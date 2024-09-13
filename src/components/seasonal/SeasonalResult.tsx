import React from "react";
import { Anime } from "../../config/data";
import Card from "../home/Card";
import ListCard from "../ListCard";

interface SeasonalResultProps {
  data: Anime[];
  viewMode: string;
}

const SeasonalResult: React.FC<SeasonalResultProps> = ({ data, viewMode }) => {
  return (
    <div className="p-4">
      {viewMode === "card" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {data.map((anime, index) => (
            <Card key={index} item={anime} type="anime" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((anime, index) => (
            <ListCard
              key={index}
              genres={anime.genres.map((genre) => genre.name)}
              synopsis={anime.synopsis}
              imageUrl={anime.images.jpg.large_image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonalResult;
