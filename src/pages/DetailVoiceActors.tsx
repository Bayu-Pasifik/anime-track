import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { HeartIcon } from "@heroicons/react/16/solid";
import ListTile from "../components/ListTile";
import CharacterName from "../components/details/CharacterName";
import LoadingAnimation from "../components/LoadingAnimations";
import { fetchDetailVoiceActors } from "../redux/detailAnimeSlice";
import { AppDispatch, RootState } from "../redux/store";
import ImageClick from "../components/details/ImageClick";

const DetailVoiceActors: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const person = useSelector(
    (state: RootState) => state.detailAnime.detailVoiceActors
  );
  const isLoading = useSelector(
    (state: RootState) => state.detailAnime.loading.detailVoiceActors
  );
  const [category, setCategory] = React.useState<string>("overview");

  useEffect(() => {
    if (id) {
      dispatch(fetchDetailVoiceActors(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!person) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-white">Failed to load data.</p>
      </div>
    );
  }

  const birthday = new Date(person.birthday);
  const age = new Date().getFullYear() - birthday.getFullYear();

  const renderContent = () => {
    switch (category) {
      case "voices":
        return (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {person.voices.map((voice, index) => (
              <ListTile
                key={index}
                leading={
                 <ImageClick
                    source={voice.character.images.jpg.image_url}
                    aliases={voice.character.name}
                    id={voice.character.mal_id.toString()}
                    type="animeCharacter"
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
                    <ImageClick
                      source={voice.anime.images.jpg.image_url}
                      aliases={voice.anime.title}
                      id={voice.anime.mal_id.toString()}
                      type="anime"
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
                  <ImageClick
                    source={anime.anime.images.jpg.image_url}
                    aliases={anime.anime.title}
                    id={anime.anime.mal_id.toString()}
                    type="anime"
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
            {person.voices.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Voiced In
                </h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {person.voices.slice(0, 4).map((voice) => (
                    <ListTile
                      key={voice.character.mal_id}
                      leading={
                        <ImageClick
                          source={voice.character.images.jpg.image_url}
                          aliases={voice.character.name}
                          id={voice.character.mal_id.toString()}
                          type="animeCharacter"
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
                          <ImageClick
                            source={voice.anime.images.jpg.image_url}
                            aliases={voice.anime.title}
                            id={voice.anime.mal_id.toString()}
                            type="anime"
                            />
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {person.anime.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Appears in Anime
                </h2>
                <div className="grid lg:grid-cols-2 gap-4">
                  {person.anime.slice(0, 4).map((anime) => (
                    <ListTile
                      key={anime.anime.mal_id}
                      leading={
                        <ImageClick
                          source={anime.anime.images.jpg.image_url}
                          aliases={anime.anime.title}
                          id={anime.anime.mal_id.toString()}
                          type="anime"
                          />
                      }
                      title={
                        <div className="flex flex-col">
                          <CharacterName
                            name={anime.anime.title}
                            to={`/anime/detail/${anime.anime.mal_id}`}
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
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          {/* Character Information */}
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={person.images.jpg.image_url}
              alt={person.name}
              className="w-auto h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
            />
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
              <div className="w-full flex flex-row mt-4 justify-evenly border-t border-gray-600 pt-4">
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

         
        </div>
         {/* Tab Content */}
          <div className="mt-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DetailVoiceActors;
