import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimeDetail } from "../config/data";
import axios from "../config/axiosConfig";
import Navbar from "../components/Navbar";
import ListCard from "../components/ListCard";
import { CharacterDetail } from "../config/characters";
import { Recommendation } from "../config/animeRecomendation";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import { StaffData } from "../config/staff";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllRelations, setShowAllRelations] = useState<boolean>(false);
  const [animeCharacter, setAnimeCharacter] = useState<CharacterDetail[]>([]);
  const [Recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [staffAnime, setStaffAnime] = useState<StaffData[]>([]);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`/anime/${id}/full`);
        setAnimeDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching anime details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  useEffect(() => {
    const fetchAnimeCharacter = async () => {
      try {
        const response = await axios.get(`/anime/${id}/characters`);
        setAnimeCharacter(response.data.data);
      } catch (error) {
        console.error("Error fetching anime characters", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeCharacter();
  }, [id]);

  useEffect(() => {
    const fetchAnimeRecommendations = async () => {
      try {
        const response = await axios.get(`/anime/${id}/recommendations`);
        setRecommendations(response.data.data);
      } catch (error) {
        console.error("Error fetching anime recommendations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeRecommendations();
  }, [id]);

  useEffect(() => {
    const fetchStaffAnime = async () => {
      try {
        const response = await axios.get(`/anime/${id}/staff`);
        setStaffAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching staff anime", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStaffAnime();
  }, [id]);
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
    <div className="bg-slate-800 min-h-screen w-full h-full">
      <Navbar />
      <div className="banner w-full h-96 relative">
        <img
          className="w-full h-full object-cover"
          src={animeDetail.trailer.images.maximum_image_url}
          alt={animeDetail.title}
        />
      </div>
      <div className="relative bg-slate-300 w-full flex p-4">
        <img
          className="rounded-xl w-60 h-96 object-cover absolute -top-28 left-7"
          src={animeDetail.images.jpg.large_image_url}
          alt={animeDetail.title}
        />
        <div className="ml-72 mt-4 flex flex-col w-full">
          <div>
            <h1 className="text-3xl font-bold text-white">{animeDetail.title}</h1>
            <p className="text-2xl font-bold text-white">{animeDetail.title_japanese}</p>
            <p className="mt-4 text-white font-dm-mono">{animeDetail.synopsis}</p>
          </div>
          <div className="mt-4 flex justify-center items-center w-full">
            <div className="flex justify-between items-center w-2/4 h-12 gap-4 p-8">
              <Link  to={`/detail/${animeDetail.mal_id}`}>
                <p className="text-xl font-bold text-white hover:underline">Overview</p>
              </Link>
              <Link to={`/detail/${animeDetail.mal_id}`}>
                <p className="text-xl font-bold text-white hover:underline">Characters</p>
              </Link>
              <Link to={`/detail/${animeDetail.mal_id}`}>
                <p className="text-xl font-bold text-white hover:underline">Staff</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full full flex flex-row bg-orange-500">
        <Sidebar animeDetail={animeDetail}/>
        <Content animeCharacter={animeCharacter} animeStaff={staffAnime}/>
      </div>
    </div>
  );
  };
  
  export default Detail;
  
  
  