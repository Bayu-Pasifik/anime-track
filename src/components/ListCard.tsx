import React from "react";
import { Link } from "react-router-dom";
import { CharacterDetail } from "../config/characters";
import { Recommendation } from "../config/animeRecomendation";

interface ListCardProps {
  type: "character" | "recommendation";
  listData: CharacterDetail[] | Recommendation[];
  category: string;
}

const ListCard: React.FC<ListCardProps> = ({ type, listData,category }) => {
  if (type === "character") {
    const characters = listData as CharacterDetail[];
    return (
      <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
        {characters.map((character) => (
          <div key={character.character.mal_id} className="bg-gray-900 p-4 rounded-xl text-white">
            <img src={character.character.images.jpg.image_url} alt={character.character.name} className="w-full h-auto rounded-md mb-2" />
            <h4 className="text-lg font-bold">{character.character.name}</h4>
            <p className="text-sm">{character.role}</p>
          </div>
        ))}
      </div>
    );
  } else if (type === "recommendation") {
    const recommendations = listData as Recommendation[];
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((recommendation) => (
          <Link to={`/detail/${recommendation.entry.mal_id}`} key={recommendation.entry.mal_id} className="bg-gray-900 p-4 rounded-xl text-white">
            <img src={recommendation.entry.images.jpg.image_url} alt={recommendation.entry.title} className="w-full h-auto rounded-md mb-2" />
            <h4 className="text-lg font-bold">{recommendation.entry.title}</h4>
          </Link>
        ))}
      </div>
    );
  } else if(category=== "character"){
    return <div>
      
    </div>
  }

  return null;
};

export default ListCard;
