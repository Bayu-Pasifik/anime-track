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
import { delay } from "../utils/delay";
import LoadingAnimation from "../components/LoadingAnimations";
import Information from "../components/details/InformationContainer";
import Tabbar from "../components/details/TabBar";

const DetailManga: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const {
    mangaDetail,
    loading,
  } = useSelector((state: RootState) => state.detailManga);

  const [isDataLoading, setIsDataLoading] = useState(true); // State for handling loading display

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsDataLoading(true);
        await dispatch(fetchMangaDetail(id));
        await delay(1000);
        await dispatch(fetchMangaCharacter(id));
        await delay(1000);
        await dispatch(fetchMangaRecomendation(id));
        await delay(1000);
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
    loading.mangaRecommendations ||
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
      <div className="flex flex-col w-full mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Section */}
          <div className="flex-shrink-0">
            <img
              className="w-full md:w-64 h-auto rounded-lg shadow-lg"
              src={mangaDetail.images.jpg.large_image_url}
              alt={mangaDetail.title}
            />
          </div>
          {/* Details Section */}
          <Information mangaDetail={mangaDetail} type="manga" />
        </div>
        <Tabbar type="manga"/>
      </div>
    </div>
  );
};

export default DetailManga;
