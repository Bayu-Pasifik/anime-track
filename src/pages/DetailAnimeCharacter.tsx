import axios from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimeCharacter } from "../config/characters";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { HeartIcon } from "@heroicons/react/16/solid";
// import { HeartIcon } from "@heroicons/react/solid"; // Optional: Using HeroIcons for consistent icons

const DetailAnimeCharacter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeCharacter, setAnimeCharacter] = useState<AnimeCharacter | null>(
    null
  );

  const fetchDetailCharacter = async () => {
    try {
      const response = await axios.get(`/characters/${id}/full`);
      setAnimeCharacter(response.data.data);
    } catch (error) {
      console.error("Error fetching anime character", error);
    }
  };

  useEffect(() => {
    fetchDetailCharacter();
  }, [id]);

  if (!animeCharacter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Character Information */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
          {/* Character Image */}
          <img
            src={animeCharacter.images.jpg.image_url}
            alt={animeCharacter.name}
            className="w-auto h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
          />
          {/* Character Details */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0">
                {animeCharacter.name}
              </h1>
              <div className="flex items-center text-white bg-blue-400 text-lg px-4 py-2 rounded-lg">
                <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-medium">
                  {animeCharacter.favorites.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center text-gray-400 mt-2">
              <p className="mr-2">{animeCharacter.name_kanji}</p>
              {animeCharacter.nicknames.length > 0 && (
                <>
                  <span className="mx-2">|</span>
                  {animeCharacter.nicknames.map((nickname, index) => (
                    <p key={index} className="italic mr-2">
                      {nickname}
                      {index < animeCharacter.nicknames.length - 1 && ","}
                    </p>
                  ))}
                </>
              )}
            </div>
            <p className="text-gray-300 mt-4 text-justify">
              {animeCharacter.about}
            </p>
          </div>
        </div>

        {/* Voices By Section */}
        {animeCharacter.voices.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Voiced By</h2>
            <Swiper
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {animeCharacter.voices.map((voice, index) => (
                <SwiperSlide key={index}>
                  <ListCard
                    image={voice.person.images.jpg.image_url}
                    title={voice.person.name}
                    description={voice.language}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Appears in Anime Section */}
        {animeCharacter.anime.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Appears in Anime
            </h2>
            <Swiper
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {animeCharacter.anime.map((anime, index) => (
                <SwiperSlide key={index}>
                  <ListCard
                    image={anime.anime.images.jpg.image_url}
                    title={anime.anime.title}
                    description={anime.role}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Appears in Manga Section */}
        {animeCharacter.manga.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Appears in Manga
            </h2>
            <Swiper
              spaceBetween={16}
              slidesPerView={2}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {animeCharacter.manga.map((manga, index) => (
                <SwiperSlide key={index}>
                  <ListCard
                    image={manga.manga.images.jpg.image_url}
                    title={manga.manga.title}
                    description={manga.role}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailAnimeCharacter;
