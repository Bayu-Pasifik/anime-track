import React, { useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAnimeDetail,
  fetchAnimeCharacter,
  fetchAnimeRecommendations,
  fetchStaffAnime,
  fetchAnimePicture,
} from "../redux/detailAnimeSlice";
import { RootState, AppDispatch } from "../redux/store";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { delay } from '../utils/delay';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const {
    animeDetail,
    loading,
    animeCharacter,
    Recommendations,
    staffAnime,
    animePicture,
  } = useSelector((state: RootState) => state.detailAnime);

  const category = location.pathname.split("/")[4] || "overview";
  console.log(category)
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        // Fetch detail anime
        await dispatch(fetchAnimeDetail(id));
        await delay(1000); // Delay to prevent too many request
        // Fetch other data concurrently with delays
        await Promise.all([
          dispatch(fetchAnimeCharacter(id)),
          delay(400),
          dispatch(fetchAnimeRecommendations(id)),
          delay(400),
          dispatch(fetchStaffAnime(id)),
          delay(400),
          dispatch(fetchAnimePicture(id)),
        ]);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-40 w-40 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="text-2xl text-black">Loading</p>
      </div>
    );
  }

  if (!animeDetail) {
    return <p className="text-2xl text-white">Anime details not found</p>;
  }

  return (
    <div className="bg-bg-color min-h-screen w-full h-full">
      <Navbar />
      <div className="banner w-full h-96 relative">
        <img
          className="w-full h-full object-cover"
          src={animeDetail.trailer.images.maximum_image_url}
          alt={animeDetail.title}
        />
      </div>
      {/* Container bg-slate-800 yang responsif */}
      <div className="relative bg-slate-800 lg:w-full flex flex-col lg:flex-row p-4 lg:p-8  sm:w-8/12 mx-auto">
        <img
          className="rounded-xl w-60 h-96 object-cover lg:absolute lg:-top-28 lg:left-7"
          src={animeDetail.images.jpg.large_image_url}
          alt={animeDetail.title}
        />
        {/* Title */}
        <div className="ml-0 lg:ml-72 mt-4 lg:mt-0 flex flex-col w-full">
          <div>
            <h1 className="text-3xl font-bold text-gray-600">
              {animeDetail.title}
            </h1>
            <p className="text-2xl font-bold text-gray-600">
              {animeDetail.title_japanese}
            </p>
            <p className="mt-4 font-dm-mono text-white">
              {animeDetail.synopsis}
            </p>
          </div>
          <div className="mt-4 flex justify-start lg:justify-center items-center w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:w-2/4 w-full gap-4 p-8 text-gray-600">
              <Link to={`/anime/detail/${id}`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "overview" ? "text-blue-700" : ""
                  }`}
                >
                  Overview
                </p>
              </Link>
              <Link to={`/anime/detail/${id}/characters`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "characters" ? "text-blue-700" : ""
                  }`}
                >
                  Characters
                </p>
              </Link>
              <Link to={`/anime/detail/${id}/staff`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "staff" ? "text-blue-700" : ""
                  }`}
                >
                  Staff
                </p>
              </Link>
              <Link to={`/anime/detail/${id}/pictures`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "pictures" ? "text-blue-700" : ""
                  }`}
                >
                  Pictures
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row">
        <Sidebar
          animeDetail={animeDetail}
          className="lg:w-1/3 w-full order-1 mt-10"
        />
        <Content
          pictures={animePicture}
          animeCharacter={animeCharacter}
          animeStaff={staffAnime}
          detailAnime={animeDetail}
          animeRecomendation={Recommendations}
          category={category}
          className="lg:w-2/3 w-full order-2"
        />
      </div>
    </div>
  );
};

export default Detail;
