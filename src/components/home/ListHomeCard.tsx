import React from "react";
import { Anime } from "../../config/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "./Card";

interface ListHomeCardProps {
  animes: Anime[];
  type?: string;
  destination: string;
}

const ListHomeCard: React.FC<ListHomeCardProps> = ({
  animes,
  type,
  destination,
}) => {
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
        {type === "currently" ? (
          <a href={destination} className="text-2xl font-bold text-white cursor-pointer">
            View More
          </a>
        ) : type === "upcoming" ? (
          <a href={destination} className="text-2xl font-bold text-white cursor-pointer">
            View More
          </a>
        ) : (
          <a href={destination} className="text-2xl font-bold text-white cursor-pointer">
            View More
          </a>
        )}
      </div>
      <div>
        <Swiper
          spaceBetween={10} // Mengurangi space antara slide
          breakpoints={{
            180: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
            1536: {
              slidesPerView: 7,
            },
          }}
          className="mySwiper"
        >
          {animelist.map((anime,index) => (
            <SwiperSlide key={anime.mal_id} className="flex-shrink-0">
              <Card 
              title={anime.title}
              imageUrl={anime.images.jpg.large_image_url}
              synopsis={anime.synopsis}
              type="anime"
              mal_id={anime.mal_id}
              key={index}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ListHomeCard;
