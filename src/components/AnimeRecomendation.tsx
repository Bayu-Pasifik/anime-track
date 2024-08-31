import { useState } from "react";
import { Recommendation } from "../config/animeRecomendation";

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
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
        {displayedRecommendations.map((recommendation) =>
          type === "anime" ? (
            <a
              href={`/anime/detail/${recommendation.entry.mal_id}`}
              key={recommendation.entry.mal_id}
              className="w-full h-auto rounded-md mb-2"
            >
              <img
                src={recommendation.entry.images.jpg.image_url}
                alt={recommendation.entry.title}
                className="w-full h-52 object-cover rounded-md mb-2"
              />
              <h4 className="text-lg font-bold truncate text-white">
                {recommendation.entry.title}
              </h4>
            </a>
          ) : (
            <a
              href={`/manga/detail/${recommendation.entry.mal_id}`}
              key={recommendation.entry.mal_id}
              className="w-full h-auto rounded-md mb-2"
            >
              <img
                src={recommendation.entry.images.jpg.image_url}
                alt={recommendation.entry.title}
                className="w-full h-52 object-cover rounded-md mb-2"
              />
              <h4 className="text-lg font-bold truncate text-white">
                {recommendation.entry.title}
              </h4>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default AnimeRecomendation;
