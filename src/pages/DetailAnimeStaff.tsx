import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListTile from "../components/ListTile";
import CharacterName from "../components/details/CharacterName";
import Navbar from "../components/Navbar";
import { HeartIcon } from "@heroicons/react/16/solid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchDetailAnimeStaff } from "../redux/detailAnimeSlice";
import LoadingAnimation from "../components/LoadingAnimations";
import ImageClick from "../components/details/ImageClick";
import Footer from "../components/Footer";

const DetailStaff: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<string>("overview");
  const dispatch = useDispatch<AppDispatch>();
  const animeStaff = useSelector(
    (state: RootState) => state.detailAnime.detailAnimeStaff
  );
  const isLoading = useSelector(
    (state: RootState) => state.detailAnime.loading.detailAnimeStaff
  );

  useEffect(() => {
    const fetchStaffAnime = async () => {
      if (id) {
        await dispatch(fetchDetailAnimeStaff(id));
      }
    };

    fetchStaffAnime();
  }, [id, dispatch]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!animeStaff) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  const birthday = new Date(animeStaff.birthday);
  const age = new Date().getFullYear() - birthday.getFullYear();
  //   const voiceOverview = animeStaff.voices.slice(0, 4);
  const animePosition = animeStaff.anime.slice(0, 4);
  const renderContent = () => {
    switch (category) {
      case "position":
        return (
          <div className="mt-8 grid grid-cols-1 gap-4">
            {animeStaff.anime.map((anime, index) => (
              <ListTile
                key={index}
                leading={
                  <ImageClick
                    source={anime.anime.images.jpg.image_url}
                    aliases={anime.anime.title}
                    id={anime.anime.mal_id.toString()}
                    type="anime"
                    // className="rounded-md object-cover h-auto w-auto"
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

            {/* Appears in Anime Section */}
            {animeStaff.anime.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Position in Anime
                </h2>
                <div className="grid lg:grid-cols-2 gap-4">
                  {animePosition.map((anime) => (
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
        {/* Character Information */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center">
          {/* Character Image */}
          <img
            src={animeStaff.images.jpg.image_url}
            alt={animeStaff.name}
            className="w-auto h-auto rounded-lg object-cover mb-4 md:mb-0 md:mr-6"
          />
          {/* Character Details */}
          <div className="flex flex-col w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
              <div className="flex lg:items-center order-1 sm:order-2 text-white bg-blue-400 text-lg px-4 py-2 rounded-lg">
                <HeartIcon className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg font-medium">
                  {animeStaff.favorites.toLocaleString()}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 sm:mb-0 order-2 sm:order-1">
                {animeStaff.name}
              </h1>
            </div>

            <div className="flex flex-wrap items-center text-gray-400 mt-2">
              <p className="mr-2">
                {animeStaff.family_name} {animeStaff.given_name}
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
            <p className="text-gray-300 mt-4 text-justify">
              {animeStaff.about}
            </p>

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
              {/* <button
                onClick={() => setCategory("manga")}
                className={`text-xl font-bold text-white hover:text-blue-400 ${
                  category === "manga" ? "underline" : ""
                }`}
              >
                manga
              </button> */}
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
      <Footer />
    </div>
  );
};

export default DetailStaff;
