import React from "react";
import { Link } from "react-router-dom";
import { Anime } from "../../config/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./Card";

interface ListHomeCardProps {
  animes: Anime[];
  type?: string;
}

const ListHomeCard: React.FC<ListHomeCardProps> = ({ animes, type }) => {
  const animelist = animes.slice(0, 25);
  return (
    <div className="p-4">
      <div className="flex flex-row justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">
          {type === "currently"
            ? "Currently Airing"
            : type === "upcoming"
            ? "Upcoming Anime"
            : "Popular Anime"}
        </h3>
        <Link
          to="/view-more"
          className="text-2xl font-bold text-white cursor-pointer"
        >
          View More
        </Link>
      </div>
      <div className="flex flex-row w-full gap-4">
        <Swiper spaceBetween={20} slidesPerView={7} className="mySwiper">
          {animelist.map((anime) => (
            <SwiperSlide key={anime.mal_id} style={{ width: "auto" }}>
              <Card anime={anime} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ListHomeCard;
