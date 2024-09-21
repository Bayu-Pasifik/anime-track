import { useState } from "react";
import { Recommendation } from "../config/animeRecomendation";
import Card from "./home/Card";

interface AnimeRecomendationProps {
  animeRecomendation: Recommendation[];
  type?: string;
}

const AnimeRecomendation: React.FC<AnimeRecomendationProps> = ({
  animeRecomendation,
  type,
}) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedRecommendations = showAll
    ? animeRecomendation
    : animeRecomendation.slice(0, 7);

  return (
    <div className="mt-4">
      <div className="w-full flex justify-between items-center mb-4 font-roboto">
        <h1 className="lg:text-2xl text-white">Recommendations</h1>
        <button onClick={toggleShowAll} className="text-blue-600 font-bold">
          {showAll ? "Show Less" : "See All Recomendations"}
        </button>
      </div>
      {animeRecomendation.length === 0 ? (
        <p className="text-white text-center text-xl font-bold">No recommendations found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {displayedRecommendations.map((recommendation,index) =>
          type === "anime" ? (
            <Card
              title={recommendation.entry.title}
              imageUrl={recommendation.entry.images.jpg.image_url}
              type="anime"
              mal_id={recommendation.entry.mal_id}
              key={index}
            />
          ) : (
            <Card
            imageUrl={recommendation.entry.images.jpg.image_url}
            title={recommendation.entry.title}
            type="manga"
            mal_id={recommendation.entry.mal_id}
            key={index}
            />
          )
        )}
      </div>
      )}
    </div>
  );
};

export default AnimeRecomendation;
