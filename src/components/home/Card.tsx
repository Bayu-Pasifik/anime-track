import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "../../config/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CardProps {
  animes: Anime[];
}

const Card: React.FC<CardProps> = ({ animes }) => {
  const animelist = animes.slice(0, 25);
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Currently Airing</h3>
        <Link to="/view-more" className="text-2xl font-bold text-white cursor-pointer">
          View More
        </Link>
      </div>
      <div className="flex flex-row w-full gap-4">
        <Swiper
          spaceBetween={1}
          slidesPerView={7}
          className="mySwiper"
        >
          {animelist.map((anime) => (
            <SwiperSlide key={anime.mal_id} style={{ width: 'auto' }}>
              <div className="relative w-52 h-64 group overflow-hidden">
                <img
                  className="w-full h-full rounded-md object-cover"
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-900 flex items-center justify-center p-4 rounded-md">
                  <p className="text-white text-sm text-center line-clamp-6 overflow-hidden">
                    {anime.synopsis}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 p-2 text-center text-white group-hover:hidden">
                  <h2 className="text-sm font-bold">{anime.title}</h2>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Card;
