import React, { useEffect, useState } from "react";
import { Anime } from "../config/data";
import axios from "../config/axiosConfig";
import HeaderCarousel from "../components/carousel/Carousel";
import Navbar from "../components/Navbar";
import Card from "../components/home/Card";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [topAiring, setTopAiring] = useState<Anime[]>([]);
  const [currentlyAiring, setCurrentlyAiring] = useState<Anime[]>([]);
  const [upComingAnime, setupComingAnime] = useState<Anime[]>([]);
  const [popularAnime, setPopularAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchTopAiring = async () => {
          const response = await axios.get("/top/anime");
          setTopAiring(response.data.data);
        };

        const fetchCurrentlyAiring = async () => {
          await delay(1000); // 1000ms delay
          const response = await axios.get("/seasons/now");
          setCurrentlyAiring(response.data.data);
        };

        const fetchUpcomingAnime = async () => {
          await delay(1000); // 1000ms delay
          const response = await axios.get("/seasons/upcoming");
          setupComingAnime(response.data.data);
        };

        const fetchPopularAnime = async () => {
          await delay(1000); // 1000ms delay
          const response = await axios.get("/anime", {
            params: { order_by: "popularity", type: "tv", sfw: true },
          });
          setPopularAnime(response.data.data);
        };

        await fetchTopAiring();
        await fetchCurrentlyAiring();
        await fetchUpcomingAnime();
        await fetchPopularAnime();
      } catch (error) {
        console.error("Error fetching anime data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-bg-color h-full w-full">
      <Navbar />
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-screen"
        >
          <p className="text-white">Loading...</p>
        </motion.div>
      ) : (
        <>
          <HeaderCarousel animes={topAiring} />
          <Card animes={currentlyAiring} type="currently" />
          <Card animes={upComingAnime} type="upcoming" />
          <Card animes={popularAnime} type="popular" />
        </>
      )}
    </div>
  );
};

export default Home;
