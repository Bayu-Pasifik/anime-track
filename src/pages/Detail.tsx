import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAnimeCharacter,
  fetchAnimeDetail,
  fetchAnimePicture,
  fetchAnimeRecommendations,
  fetchStaffAnime,
} from "../redux/detailAnimeSlice";
import { RootState, AppDispatch } from "../redux/store";
import Navbar from "../components/Navbar";
import LoadingAnimation from "../components/LoadingAnimations";
import Information from "../components/details/InformationContainer";
import Tabbar from "../components/details/TabBar";
import { delay } from "../utils/delay";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    animeDetail,
    loading,
  } = useSelector((state: RootState) => state.detailAnime);

  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsDataLoading(true);
        await dispatch(fetchAnimeDetail(id));
        await delay(1000);
        await dispatch(fetchAnimeCharacter(id));
        await delay(1000);
        await dispatch(fetchStaffAnime(id));
        await delay(1000);
        await dispatch(fetchAnimeRecommendations(id));
        await delay(1000);
        await dispatch(fetchAnimePicture(id));
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

  if (!animeDetail) {
    return <p className="text-2xl text-white">Anime details not found</p>;
  }


  return (
    <div className="bg-bg-color min-h-screen w-full h-full">
      <Navbar />
      <div className="flex flex-col w-full mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Section */}
          <div className="flex-shrink-0">
            <img
              className="w-full md:w-64 h-auto rounded-lg shadow-lg"
              src={animeDetail.images.jpg.large_image_url}
              alt={animeDetail.title}
            />
          </div>
          {/* Details Section */}
          <Information animeDetail={animeDetail} type="anime" />
        </div>
        <Tabbar type="anime"/>
      </div>
    </div>
  );
};

export default Detail;
