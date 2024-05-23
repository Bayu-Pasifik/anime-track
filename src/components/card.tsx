import React from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../config/data';
import { motion } from 'framer-motion';

interface CardProps {
  animes: Anime[];
}

const Card: React.FC<CardProps> = ({ animes }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
      {animes.map((anime) => (
        <motion.div
          key={anime.mal_id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to={`/detail/${anime.mal_id}`}>
            <div className="card mt-4 p-2 border rounded shadow">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="w-full h-20 text-xl text-center text-white font-bold overflow-hidden text-ellipsis">
                {anime.title}
              </h2>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;
