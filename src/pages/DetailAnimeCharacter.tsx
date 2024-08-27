import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import { AnimeCharacter } from "../config/characters";
import ListTile from "../components/ListTile";
import CharacterName from "../components/details/CharacterName";

const DetailCharacter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeCharacter, setAnimeCharacter] = useState<AnimeCharacter | null>(
    null
  );
  const [category, setCategory] = useState<string>("Overview");

  const fetchDetailCharacter = async () => {
    try {
      const response = await axios.get(`/characters/${id}/full`);
      console.log({ response: response.data.data });
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

  const renderContent = () => {
    const OverviewAnime = animeCharacter.anime.slice(0, 4);
    const OverviewVoice = animeCharacter.voices.slice(0, 4);
    const OverviewManga = animeCharacter.manga.slice(0, 4);
    switch (category) {
      case "voices":
        return (
          <div className="mt-8">
            <p className="text-xl font-bold text-white mt-4">Voices by</p>
            {/* Overview anime */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {animeCharacter.voices.map((voice, index) => (
                <ListTile
                  key={index}
                  leading={
                    <img
                      className="w-auto h-40 object-cover"
                      src={voice.person.images.jpg.image_url}
                      alt={voice.person.name}
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName
                        name={voice.person.name}
                        to={`/anime/${voice.person.mal_id}/voice-actors`}
                      />
                      <p className="text-sm text-white">( {voice.language} )</p>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        );
      case "anime":
        return (
          <div className="mt-8">
            <p className="text-xl font-bold text-white mt-4">Appear in Anime</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {animeCharacter.anime.map((anime, index) => (
                <ListTile
                  key={index}
                  leading={
                    <img
                      className="w-auto h-40 object-cover"
                      src={anime.anime.images.jpg.image_url}
                      alt={anime.anime.title}
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName
                        name={anime.anime.title}
                        to={`/anime/detail/${anime.anime.mal_id}`}
                      />
                      <p className="text-sm text-white">( {anime.role} )</p>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        );
      case "manga":
        return (
          <div className="mt-8">
            <p className="text-xl font-bold text-white mt-4">
              Appear in Manga / Manhua / Manhwa / Novels
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {animeCharacter.manga.map((manga, index) => (
                <ListTile
                  key={index}
                  leading={
                    <img
                      className="w-auto h-40 object-cover"
                      src={manga.manga.images.jpg.image_url}
                      alt={manga.manga.title}
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName
                        name={manga.manga.title}
                        to={`/manga/detail/${manga.manga.mal_id}`}
                      />
                      <p className="text-sm text-white">( {manga.role} )</p>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div>
            <p className="text-xl font-bold text-white mt-4">Voices by</p>
            {/* Overview anime */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {OverviewVoice.map((voice, index) => (
                <ListTile
                  key={index}
                  leading={
                    <img
                      className="w-auto h-40 object-cover"
                      src={voice.person.images.jpg.image_url}
                      alt={voice.person.name}
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName
                        name={voice.person.name}
                        to={`/anime/${voice.person.mal_id}/voice-actors`}
                      />
                      <p className="text-sm text-white">( {voice.language} )</p>
                    </div>
                  }
                />
              ))}
            </div>
            <p className="text-xl font-bold text-white mt-4">Appear in Anime</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {OverviewAnime.map((anime, index) => (
                <ListTile
                  key={index}
                  leading={
                    <img
                      className="w-auto h-40 object-cover"
                      src={anime.anime.images.jpg.image_url}
                      alt={anime.anime.title}
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName
                        name={anime.anime.title}
                        to={`/anime/detail/${anime.anime.mal_id}`}
                      />
                      <p className="text-sm text-white">( {anime.role} )</p>
                    </div>
                  }
                />
              ))}
            </div>
            <p className="text-xl font-bold text-white mt-4">
              Appear in Manga / Manhua / Manhwa / Novels
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {OverviewManga.map((manga, index) => (
                <ListTile
                  key={index}
                  leading={
                    <img
                      className="w-auto h-40 object-cover"
                      src={manga.manga.images.jpg.image_url}
                      alt={manga.manga.title}
                    />
                  }
                  title={
                    <div className="flex flex-col">
                      <CharacterName
                        name={manga.manga.title}
                        to={`/manga/detail/${manga.manga.mal_id}`}
                      />
                      <p className="text-sm text-white">( {manga.role} )</p>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
          <img
            src={animeCharacter.images.jpg.image_url}
            alt={animeCharacter.name}
            className="w-auto h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div className="flex items-center order-1 sm:order-2 text-white bg-blue-400 text-lg px-4 py-2 rounded-lg">
                <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-medium">
                  {animeCharacter.favorites.toLocaleString()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0 order-2 sm:order-1">
                {animeCharacter.name}
              </h1>
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

            {/* Tab Bar */}
            <div className="w-full flex flex-row mt-4 justify-evenly">
              <button
                onClick={() => setCategory("Overview")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "Overview" ? "underline" : ""
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
                onClick={() => setCategory("anime")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "anime" ? "underline" : ""
                }`}
              >
                Anime
              </button>
              <button
                onClick={() => setCategory("manga")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "manga" ? "underline" : ""
                }`}
              >
                Manga
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

export default DetailCharacter;
