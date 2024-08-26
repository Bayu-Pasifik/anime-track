import axios from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimeCharacter } from "../config/characters";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper.min.css';

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
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-bg-color min-h-screen w-full h-full">
      <Navbar />
      <div className="flex flex-col h-full w-full p-6">
        {/* Character Information */}
        <div className="w-full bg-slate-600 rounded-lg shadow-md p-6 flex">
          <img
            src={animeCharacter.images.jpg.image_url}
            alt={animeCharacter.name}
            className="w-auto h-auto rounded-lg object-cover"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-bold text-white">
              {animeCharacter.name}
            </h1>
            <div className="flex flex-row flex-wrap">
              <p className="text-white mt-2">{animeCharacter.name_kanji} | </p>
              {animeCharacter.nicknames.map((nickname, index) => (
                <p
                  key={index}
                  className="text-white mt-2 ml-2 italic underline"
                >
                  ( {nickname} )
                </p>
              ))}
            </div>
            <p className="text-white mt-2">{animeCharacter.about}</p>
          </div>
        </div>

        {/* Media Anime */}
        <p className="text-2xl font-bold text-white mt-6">Voices By</p>
        <div className="w-full mt-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={8} // Number of slides visible at once
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
        <p className="text-2xl font-bold text-white mt-6">Appears in Anime</p>
        <div className="w-full mt-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={8} // Number of slides visible at once
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
        <p className="text-2xl font-bold text-white mt-6">Appears in Manga</p>
        <div className="w-full mt-4">
          <Swiper
            spaceBetween={10}
            slidesPerView={8} // Number of slides visible at once
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
      </div>
    </div>
  );
};

export default DetailAnimeCharacter;
