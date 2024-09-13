import React from "react";
import { Anime } from "../../config/data";
import Card from "../home/Card";

interface SeasonalResultProps {
  data: Anime[];
  viewMode: string; // "card" or "list"
}

const SeasonalResult: React.FC<SeasonalResultProps> = ({ data, viewMode }) => {
  return (
    <div>
      {viewMode === "card" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {data.map((anime, index) => (
            <Card key={index} item={anime} type="anime"/>
          ))}
        </div>
      ) : (
        <ul>
          {data.map((anime, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h3 className="text-lg font-semibold">{anime.title}</h3>
              <p className="text-gray-500">{anime.season}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeasonalResult;
