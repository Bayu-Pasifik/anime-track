import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
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
import { delay } from "../utils/delay";
import LoadingAnimation from "../components/LoadingAnimations";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    animeDetail,
    animeCharacter,
    Recommendations,
    staffAnime,
    animePicture,
    loading,
  } = useSelector((state: RootState) => state.detailAnime);

  const [isDataLoading, setIsDataLoading] = useState(true); // State for handling loading display
  const category = location.pathname.split("/")[4] || "overview";

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsDataLoading(true);
        await dispatch(fetchAnimeDetail(id));
        await dispatch(fetchAnimeCharacter(id));
        await delay(1000);
        await dispatch(fetchAnimeRecommendations(id));
        await dispatch(fetchStaffAnime(id));
        await dispatch(fetchAnimePicture(id));
        setIsDataLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (isDataLoading || loading.detail || loading.character || loading.recommendations || loading.staff || loading.pictures) {
    return <LoadingAnimation />;
  }

  if (!animeDetail) {
    return <p className="text-2xl text-white">Anime details not found</p>;
  }

  const handleCategoryChange = (category: string) => {
    navigate(`/anime/detail/${id}/${category}`);
  };

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
      <div className="relative bg-slate-800 lg:w-full flex flex-col lg:flex-row p-4 lg:p-8 sm:w-8/12 mx-auto">
        <img
          className="rounded-xl w-60 h-96 object-cover lg:absolute lg:-top-28 lg:left-7"
          src={animeDetail.images.jpg.large_image_url}
          alt={animeDetail.title}
        />
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
            <div className="flex flex-row justify-between items-center lg:w-full w-full gap-4 p-8 text-gray-600 border-t border-gray-600 pt-4">
              <button
                onClick={() => handleCategoryChange('')}
                className={`text-xl font-bold ${
                  category === "overview" ? "text-blue-700" : "hover:text-blue-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => handleCategoryChange('characters')}
                className={`text-xl font-bold ${
                  category === "characters" ? "text-blue-700" : "hover:text-blue-700"
                }`}
              >
                Characters
              </button>
              <button
                onClick={() => handleCategoryChange('staff')}
                className={`text-xl font-bold ${
                  category === "staff" ? "text-blue-700" : "hover:text-blue-700"
                }`}
              >
                Staff
              </button>
              <button
                onClick={() => handleCategoryChange('pictures')}
                className={`text-xl font-bold ${
                  category === "pictures" ? "text-blue-700" : "hover:text-blue-700"
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
