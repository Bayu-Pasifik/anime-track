import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Person } from "../config/person";
import ListTile from "../components/ListTile";
import CharacterName from "../components/details/CharacterName";

const DetailVoiceActors: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [category, setCategory] = useState<string>("overview"); // Default ke "overview"

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
  const age = new Date().getFullYear() - birthday.getFullYear();
  const voiceOverview = person.voices.slice(0, 4);
  const animePosition = person.anime.slice(0, 4);
  const renderContent = () => {
    switch (category) {
      case "voices":
        return (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {person.voices.map((voice, index) => (
              <ListTile
                key={index}
                leading={
                  <img
                    src={voice.character.images.jpg.image_url}
                    alt={voice.character.name}
                    className="rounded-md object-cover h-auto w-auto"
                  />
                }
                title={
                  <div className="flex flex-col">
                    <CharacterName
                      name={voice.character.name}
                      to={`/anime/${voice.character.mal_id}/characters`}
                    />
                    <p className="text-sm text-white">( {voice.role} )</p>
                  </div>
                }
                trailing={
                  <div className="flex flex-row items-center">
                    <div className="flex flex-col text-right mr-4">
                      <CharacterName
                        name={voice?.anime.title ?? "N/A"}
                        to={`/anime/detail/${voice?.anime.mal_id}`}
                      />
                    </div>
                    <img
                      src={voice?.anime.images.jpg.image_url}
                      alt={voice?.anime.title}
                      className="rounded-md object-cover h-30 w-20"
                    />
                  </div>
                }
              />
            ))}
          </div>
        );
      case "position":
        return (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {person.anime.map((anime, index) => (
              <ListTile
                key={index}
                leading={
                  <img
                    src={anime.anime.images.jpg.image_url}
                    alt={anime.anime.title}
                    className="rounded-md object-cover h-36 w-auto"
                  />
                }
                title={
                  <div className="flex flex-col">
                    <CharacterName
                      name={anime.anime.title}
                      to={`/anime/detail/${anime.anime.mal_id}`}
                    />
                    <p className="text-sm text-white">( {anime.position} )</p>
                  </div>
                }
              />
            ))}
          </div>
        );
      case "overview":
      default:
        return (
          <>
            {/* Default Content (Overview) */}
            {/* Voices By Section */}
            {person.voices.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Voiced In
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {voiceOverview.map((voice) => (
                    <ListTile
                      key={voice.character.mal_id}
                      leading={
                        <img
                          src={voice.character.images.jpg.image_url}
                          alt={voice.character.name}
                          className="rounded-md object-cover h-auto w-auto"
                        />
                      }
                      title={
                        <div className="flex flex-col">
                          <CharacterName
                            name={voice.character.name}
                            to={`/anime/${voice.character.mal_id}/characters`}
                          />
                          <p className="text-sm text-white">( {voice.role} )</p>
                        </div>
                      }
                      trailing={
                        <div className="flex flex-row items-center">
                          <div className="flex flex-col text-right mr-4">
                            <CharacterName
                              name={voice?.anime.title ?? "N/A"}
                              to={`/anime/detail/${voice?.anime.mal_id}`}
                            />
                          </div>
                          <img
                            src={voice?.anime.images.jpg.image_url}
                            alt={voice?.anime.title}
                            className="rounded-md object-cover h-30 w-20"
                          />
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Appears in Anime Section */}
            {person.anime.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Appears in Anime
                </h2>
                <div className="grid lg:grid-cols-2 gap-4">
                  {animePosition.map((anime) => (
                    <ListTile
                      key={anime.anime.mal_id}
                      leading={
                        <img
                          src={anime.anime.images.jpg.image_url}
                          alt={anime.anime.title}
                          className="rounded-md object-cover h-36 w-auto"
                        />
                      }
                      title={
                        <div className="flex flex-col">
                          <CharacterName
                            name={anime.anime.title}
                            to={`/anime/${anime.anime.mal_id}/characters`}
                          />
                          <p className="text-sm text-white">
                            ( {anime.position} )
                          </p>
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        );
    }
  };

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
              <div className="flex lg:items-center order-1 sm:order-2 text-white bg-blue-400 text-lg px-4 py-2 rounded-lg">
                <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-medium">
                  {person.favorites.toLocaleString()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0 order-2 sm:order-1">
                {person.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center text-gray-400 mt-2">
              <p className="mr-2">
                {person.family_name} {person.given_name}
              </p>
            </div>
            <span className="flex flex-row">
              <p className="text-gray-300 mt-2">
                {birthday.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-300 mt-2 ml-3 italic underline">
                ( {age} years old )
              </p>
            </span>
            <p className="text-gray-300 mt-4 text-justify">{person.about}</p>

            {/* Tab Bar */}
            <div className="w-full flex flex-row mt-4 justify-evenly">
              <button
                onClick={() => setCategory("overview")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "overview" ? "underline" : ""
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCategory("voices")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "voices" ? "underline" : ""
                }`}
              >
                Voices
              </button>
              <button
                onClick={() => setCategory("position")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "position" ? "underline" : ""
                }`}
              >
                Position
              </button>
            </div>
          </div>
        </div>

        {/* Content Based on Tab Selection */}
        {renderContent()}
      </div>
    </div>
  );
};

export default DetailVoiceActors;
