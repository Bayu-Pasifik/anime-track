import React from "react";
import { Anime } from "../../config/data";
import Card from "../home/Card";
import ListCard from "../ListCard";
import { motion } from "framer-motion";

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
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                title={anime.title}
                imageUrl={anime.images.jpg.large_image_url}
                synopsis={anime.synopsis}
                type="anime"
                mal_id={anime.mal_id}
                key={index}
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((anime, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ListCard
                genres={anime.genres.map((genre) => genre.name)}
                synopsis={anime.synopsis}
                imageUrl={anime.images.jpg.large_image_url}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonalResult;
