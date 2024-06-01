import React, { useEffect, useState } from "react";
import { Anime } from "../config/data";
import axios from "../config/axiosConfig";
import HeaderCarousel from "../components/carousel/Carousel";
import Navbar from "../components/Navbar";
import Card from "../components/home/Card";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";

const Home: React.FC = () => {
  const [topAiring, setTopAiring] = useState<Anime[]>([]);
  const [currentlyAiring, setCurrentlyAiring] = useState<Anime[]>([]);
  const [upComingAnime, setupComingAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [loadingTopAiring, setLoadingTopAiring] = useState(true);
  const [loadingCurrentlyAiring, setLoadingCurrentlyAiring] = useState(true);
  const [loadingUpcomingAnime, setLoadingUpcomingAnime] = useState(true);
  const [loadingPopularAnime, setLoadingPopularAnime] = useState(true);

  useEffect(() => {
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const fetchTopAiring = async () => {
      try {
        const response = await axios.get("/top/anime");
        setTopAiring(response.data.data);
      } catch (error) {
        console.error("Error fetching top airing anime", error);
      } finally {
        setLoadingTopAiring(false);
      }
    };

    const fetchCurrentlyAiring = async () => {
      await delay(1000);
      try {
        const response = await axios.get("/seasons/now");
        setCurrentlyAiring(response.data.data);
      } catch (error) {
        console.error("Error fetching currently airing anime", error);
      } finally {
        setLoadingCurrentlyAiring(false);
      }
    };

    const fetchUpcomingAnime = async () => {
      await delay(1000);
      try {
        const response = await axios.get("/seasons/upcoming");
        setupComingAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching upcoming anime", error);
      } finally {
        setLoadingUpcomingAnime(false);
      }
    };

    const fetchPopularAnime = async () => {
      await delay(1000);
      try {
        const response = await axios.get("/anime", {
          params: { order_by: "popularity", type: "tv", sfw: true },
        });
        setPopularAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching popular anime", error);
      } finally {
        setLoadingPopularAnime(false);
      }
    };

    fetchTopAiring();
    fetchCurrentlyAiring();
    fetchUpcomingAnime();
    fetchPopularAnime();
  }, []);

  return (
    <div className="bg-bg-color h-full w-full">
      <Navbar />
      {loadingTopAiring ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-40"
        >
          <p className="text-white">Loading Top Airing...</p>
        </motion.div>
      ) : (
        <HeaderCarousel animes={topAiring} />
      )}
      {loadingCurrentlyAiring ? (
        <SkeletonCard type="currently" />
      ) : (
        <Card animes={currentlyAiring} type="currently" />
      )}
      {loadingUpcomingAnime ? (
        <SkeletonCard type="upcoming" />
      ) : (
        <Card animes={upComingAnime} type="upcoming" />
      )}
      {loadingPopularAnime ? (
        <SkeletonCard type="popular" />
      ) : (
        <Card animes={popularAnime} type="popular" />
      )}
    </div>
  );
};

export default Home;
