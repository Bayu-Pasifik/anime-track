import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/16/solid";
import ListTile from "../components/ListTile";
import CharacterName from "../components/details/CharacterName";
import { fetchDetailMangaCharacter } from "../redux/detailMangaSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import LoadingAnimation from "../components/LoadingAnimations";
import ImageClick from "../components/details/ImageClick";
import Footer from "../components/Footer";

const DetailMangaCharacter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const mangaCharacter = useSelector(
    (state: RootState) => state.detailManga.detailMangaCharacter
  );
  const isLoading = useSelector(
    (state: RootState) => state.detailManga.loading.detailMangaCharacter
  );
  const [category, setCategory] = useState<string>("Overview");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Dispatch the action to fetch character details
        dispatch(fetchDetailMangaCharacter(id));
      }
    };

    fetchData();
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!mangaCharacter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-white">Failed to load data.</p>
      </div>
    );
  }

  const renderContent = () => {
    const OverviewAnime = mangaCharacter.anime.slice(0, 4);
    const OverviewManga = mangaCharacter.manga.slice(0, 4);
    switch (category) {
      case "anime":
        return (
          <div className="mt-8">
            <p className="text-xl font-bold text-white mt-4">Appear in Anime</p>
            {mangaCharacter.anime.length == 0}
            <p className="text-white text-2xl text-center w-full mt-10 font-bold">
              No anime found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {mangaCharacter.anime.map((anime, index) => (
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
              {mangaCharacter.manga.map((manga, index) => (
                <ListTile
                  key={index}
                  leading={
                    <ImageClick
                      source={manga.manga.images.jpg.image_url}
                      aliases={manga.manga.title}
                      id={manga.manga.mal_id.toString()}
                      type="manga"
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
            <p className="text-xl font-bold text-white mt-4">Appear in Anime</p>
            {mangaCharacter.anime.length == 0}
            <p className="text-white text-2xl text-center w-full mt-10 font-bold">
              No anime found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {OverviewAnime.map((anime, index) => (
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
                    <ImageClick
                      source={manga.manga.images.jpg.image_url}
                      aliases={manga.manga.title}
                      id={manga.manga.mal_id.toString()}
                      type="manga"
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
            src={mangaCharacter.images.jpg.image_url}
            alt={mangaCharacter.name}
            className="w-auto h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div className="flex items-center order-1 sm:order-2 text-white bg-blue-400 text-lg px-4 py-2 rounded-lg">
                <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-medium">
                  {mangaCharacter.favorites.toLocaleString()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0 order-2 sm:order-1">
                {mangaCharacter.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center text-gray-400 mt-2">
              <p className="mr-2">{mangaCharacter.name_kanji}</p>
              {mangaCharacter.nicknames.length > 0 && (
                <>
                  <span className="mx-2">|</span>
                  {mangaCharacter.nicknames.map((nickname, index) => (
                    <p key={index} className="italic mr-2">
                      {nickname}
                      {index < mangaCharacter.nicknames.length - 1 && ","}
                    </p>
                  ))}
                </>
              )}
            </div>
            <p className="text-gray-300 mt-4 text-justify">
              {mangaCharacter.about}
            </p>

            {/* Tab Bar */}
            <div className="w-full flex flex-row mt-4 justify-evenly border-t border-gray-600 pt-4">
              <button
                onClick={() => setCategory("Overview")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "Overview" ? "underline" : ""
                }`}
              >
                Overview
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
      <Footer />
    </div>
  );
};

export default DetailMangaCharacter;
