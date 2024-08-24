import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { AnimeDetail } from "../config/data";
import axios from "../config/axiosConfig";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { CharacterDetail } from "../config/characters";
import { Recommendation } from "../config/animeRecomendation";
import { Images } from "../config/animeRecomendation";
import { StaffData } from "../config/staff";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [animeCharacter, setAnimeCharacter] = useState<CharacterDetail[]>([]);
  const [Recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [staffAnime, setStaffAnime] = useState<StaffData[]>([]);

  const [isDetailFetched, setIsDetailFetched] = useState<boolean>(false);
  const [isCharacterFetched, setIsCharacterFetched] = useState<boolean>(false);
  const [isRecommendationFetched, setIsRecommendationFetched] =
    useState<boolean>(false);
  const [isStaffFetched, setIsStaffFetched] = useState<boolean>(false);

  const [animePicture, setAnimePicture] = useState<Images[]>([]);

  const category = location.pathname.split("/")[3] || "overview";

  useEffect(() => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`/anime/${id}/full`);
        setAnimeDetail(response.data.data);
        setIsDetailFetched(true);
      } catch (error) {
        console.error("Error fetching anime details", error);
      }
    };

    const fetchAnimeCharacter = async () => {
      try {
        delay(1000);
        const response = await axios.get(`/anime/${id}/characters`);
        setAnimeCharacter(response.data.data);
        setIsCharacterFetched(true);
      } catch (error) {
        console.error("Error fetching anime characters", error);
      }
    };

    const fetchAnimeRecommendations = async () => {
      try {
        delay(10000);
        const response = await axios.get(`/anime/${id}/recommendations`);
        setRecommendations(response.data.data);
        setIsRecommendationFetched(true);
      } catch (error) {
        console.error("Error fetching anime recommendations", error);
      }
    };

    const fetchStaffAnime = async () => {
      try {
        delay(10000);
        const response = await axios.get(`/anime/${id}/staff`);
        setStaffAnime(response.data.data);
        setIsStaffFetched(true);
      } catch (error) {
        console.error("Error fetching staff anime", error);
      }
    };

    const fetchAnimePicture = async () => {
      try {
        delay(10000);
        const response = await axios.get(`/anime/${id}/pictures`);
        setAnimePicture(response.data.data);
      } catch (error) {
        console.error("Error fetching anime picture", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchAnimeDetail(),
        delay(1000),
        fetchAnimeCharacter(),
        fetchAnimeRecommendations(),
        fetchStaffAnime(),
        fetchAnimePicture(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const allFetched =
    isDetailFetched &&
    isCharacterFetched 
  if (loading || !allFetched) {
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
      <div className="relative bg-slate-800 w-full flex p-4">
        <img
          className="rounded-xl w-60 h-96 object-cover absolute -top-28 left-7"
          src={animeDetail.images.jpg.large_image_url}
          alt={animeDetail.title}
        />
        <div className="ml-72 mt-4 flex flex-col w-full">
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
          <div className="mt-4 flex justify-center items-center w-full">
            <div className="flex justify-between items-center w-2/4 h-12 gap-4 p-8 text-gray-600">
              <Link to={`/detail/${id}`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "overview" ? "text-blue-700" : ""
                  }`}
                >
                  Overview
                </p>
              </Link>
              <Link to={`/detail/${id}/characters`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "characters" ? "text-blue-700" : ""
                  }`}
                >
                  Characters
                </p>
              </Link>
              <Link to={`/detail/${id}/staff`}>
                <p
                  className={`text-xl font-bold hover:text-blue-700 ${
                    category === "staff" ? "text-blue-700" : ""
                  }`}
                >
                  Staff
                </p>
              </Link>
              <Link to={`/detail/${id}/pictures`}>
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
