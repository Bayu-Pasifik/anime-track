import { useState } from "react";
import { Recommendation } from "../config/animeRecomendation";

interface AnimeRecomendationProps {
    animeRecomendation: Recommendation[];
}

const AnimeRecomendation: React.FC<AnimeRecomendationProps> = ({ animeRecomendation }) => {
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const displayedRecommendations = showAll ? animeRecomendation : animeRecomendation.slice(0, 7);

    return (
        <div className="mt-4">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl">Recommendations</h1>
                <button onClick={toggleShowAll} className="text-blue-600 font-bold">
                    {showAll ? "Show Less" : "See All"}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {displayedRecommendations.map((recommendation) => (
                    <a
                        href={`/detail/${recommendation.entry.mal_id}`}
                        key={recommendation.entry.mal_id}
                        className="w-full h-auto rounded-md mb-2"
                    >
                        <img
                            src={recommendation.entry.images.jpg.image_url}
                            alt={recommendation.entry.title}
                            className="w-full h-52 object-cover rounded-md mb-2"
                        />
                        <h4 className="text-lg font-bold truncate">{recommendation.entry.title}</h4>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default AnimeRecomendation;
