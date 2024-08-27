import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Anime } from "../../config/data";
import ButtonGenre from "./buttonGenre";

interface CarouselProps {
  animes: Anime[];
}

const HeaderCarousel: React.FC<CarouselProps> = ({ animes }) => {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="mySwiper"
      >
        {animes.slice(0, 5).map((anime) => (
          <SwiperSlide
            className=" mx-auto w-full h-96 overflow-hidden relative"
            key={anime.mal_id}
          >
            <Link to={`/anime/detail/${anime.mal_id}`}>
              <div className="carousel-slide h-full relative">
                <img
                  src={anime.images.jpg.large_image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
                <p className="text-2xl font-bold text-white p-2 absolute top-60 w-full text-left">
                  {anime.title} ( {anime.title_japanese} )
                </p>
                <p className="text-2xl font-bold text-white p-2 absolute top-72 w-full text-left">
                  {" "}
                  <span>⭐</span>
                  {anime.score}
                </p>
                <p className="text-2xl font-bold text-white absolute top-1 right-1 flex items-center justify-center rounded-full bg-sky-800 h-10 w-10">
                  {anime.rank}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent">
                  <ButtonGenre genres={anime.genres} />
                </div>
                <img
                  className="absolute top-44 rounded-xl right-1 h-52 w-5h-52"
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderCarousel;
