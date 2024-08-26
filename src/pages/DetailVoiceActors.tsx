import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Person } from "../config/person";
import { Swiper, SwiperSlide } from "swiper/react";
import ListCard from "../components/ListCard";

const DetailVoiceActors: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);

  const fetchDetailCharacter = async () => {
    try {
      const response = await axios.get(`/people/${id}/full`);
      console.log({ response: response.data.data });
      setPerson(response.data.data);
    } catch (error) {
      console.error("Error fetching anime character", error);
    }
  };

  useEffect(() => {
    fetchDetailCharacter();
  }, [id]);

  if (!person) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }
  const birthday = new Date(person.birthday);

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Character Information */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
          {/* Character Image */}
          <img
            src={person.images.jpg.image_url}
            alt={person.name}
            className="w-auto h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
          />
          {/* Character Details */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0">
                {person.name}
              </h1>
              <div className="flex items-center text-white bg-blue-400 text-lg px-4 py-2 rounded-lg">
                <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-medium">
                  {person.favorites.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center text-gray-400 mt-2">
              <p className="mr-2">
                {person.family_name} {person.given_name}
              </p>
            </div>
            <p className="text-gray-300 mt-2">
              {birthday.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            <p className="text-gray-300 mt-4 text-justify">{person.about}</p>
          </div>
        </div>

        {/* Voices By Section */}
        {person.voices.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Voiced In</h2>
            <Swiper
              spaceBetween={16}
              slidesPerView={7}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 7 },
              }}
            >
              {person.voices.map((voice, index) => (
                <SwiperSlide key={index}>
                  <ListCard
                    image={voice.character.images.jpg.image_url}
                    title={voice.character.name}
                    description={voice.role}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Appears in Anime Section */}
        {person.anime.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Appears in Anime
            </h2>
            <Swiper
              spaceBetween={16}
              slidesPerView={7}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 7 },
              }}
            >
              {person.anime.map((anime, index) => (
                <SwiperSlide key={index}>
                  <ListCard
                    image={anime.anime.images.jpg.image_url}
                    title={anime.anime.title}
                    description={anime.position}
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

export default DetailVoiceActors;
