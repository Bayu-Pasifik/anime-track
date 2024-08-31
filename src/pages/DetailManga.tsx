import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMangaDetail,
  fetchMangaCharacter,
  fetchMangaRecomendation,
  fetchMangaPictures,
} from "../redux/detailMangaSlice";
import { RootState, AppDispatch } from "../redux/store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { delay } from "../utils/delay";
import LoadingAnimation from "../components/LoadingAnimations";

const DetailManga: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    mangaDetail,
    mangaCharacter,
    Recommendations,
    mangaPictures,
    loading,
  } = useSelector((state: RootState) => state.detailManga);

  const [isDataLoading, setIsDataLoading] = useState(true); // State for handling loading display
  const [category, setCategory] = useState<string>("overview");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsDataLoading(true);
        await dispatch(fetchMangaDetail(id));
        await dispatch(fetchMangaCharacter(id));
        await delay(1000);
        await dispatch(fetchMangaRecomendation(id));
        await dispatch(fetchMangaPictures(id));
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (
    isDataLoading ||
    loading.detail ||
    loading.character ||
    loading.recommendations ||
    loading.staff ||
    loading.pictures
  ) {
    return <LoadingAnimation />;
  }

  if (!mangaDetail) {
    return <p className="text-2xl text-white">Manga details not found</p>;
  }

  return (
    <div className="bg-bg-color min-h-screen w-full h-full">
      <Navbar />
      <div className="banner w-full h-96 relative">
        <img
          className="w-full h-full object-cover"
          src={mangaDetail.images.jpg.large_image_url}
          alt={mangaDetail.title}
        />
      </div>
      <div className="relative bg-slate-800 lg:w-full flex flex-col lg:flex-row p-4 lg:p-8 mx-auto">
        <img
          className="rounded-xl w-60 h-96 object-cover lg:absolute lg:-top-28 lg:left-7 lg:mx-0 mx-auto"
          src={mangaDetail.images.jpg.large_image_url}
          alt={mangaDetail.title}
        />
        <div className="ml-0 lg:ml-72 mt-4 lg:mt-0 flex flex-col w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-600 order-2 lg:order-none sm:order-3 w-full lg:w-auto mt-4 lg:mt-0">
              {mangaDetail.title}
            </h1>
            <div className="bg-blue-400 p-2 rounded-xl flex sm:w-full flex-col items-center text-white order-1 lg:order-none mt-4 lg:mt-0 lg:ml-4 w-full lg:w-auto">
              <p className="text-2xl font-bold">{mangaDetail.score}</p>
              <p>{mangaDetail.scored_by.toLocaleString()} Users</p>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-600 mt-4 lg:mt-0">
            {mangaDetail.title_japanese}
          </p>
          <p className="mt-4 font-dm-mono text-white border-b pb-5">{mangaDetail.synopsis || "No Synopsis"}</p>
          <p className="mt-4 font-dm-mono text-white pb-5">{mangaDetail.background || "No Background"}</p>
          <div className="mt-4 flex justify-start lg:justify-center items-center w-full">
            <div className="flex flex-row justify-between items-center lg:w-full w-full gap-4 p-8 text-gray-600 border-t border-gray-600 pt-4">
              <button
                onClick={() => setCategory("overview")}
                className={`text-xl font-bold ${
                  category === "overview"
                    ? "text-blue-700"
                    : "hover:text-blue-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setCategory("characters")}
                className={`text-xl font-bold ${
                  category === "characters"
                    ? "text-blue-700"
                    : "hover:text-blue-700"
                }`}
              >
                Characters
              </button>
              <button
                onClick={() => setCategory("pictures")}
                className={`text-xl font-bold ${
                  category === "pictures"
                    ? "text-blue-700"
                    : "hover:text-blue-700"
                }`}
              >
                Pictures
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row">
        <Sidebar
          mangaDetail={mangaDetail}
          className="lg:w-1/3 w-full order-1 mt-10"
          type="manga"
        />
        <Content
        type="manga"
        mangaCharacter={mangaCharacter}
          pictures={mangaPictures}
          detailManga={mangaDetail}
          animeRecomendation={Recommendations}
          category={category}
          className="lg:w-2/3 w-full order-2"
        />
      </div>
    </div>
  );
};

export default DetailManga;
