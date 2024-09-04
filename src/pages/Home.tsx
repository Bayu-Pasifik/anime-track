import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchAnimeData,
  fetchCurrentlyAiring,
  fetchPopularAnime,
  fetchTopAiring,
  fetchUpcomingAnime,
} from "../redux/animeSlice";
import { fetchTopManga } from "../redux/mangaSlice";
import HeaderCarousel from "../components/carousel/Carousel";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";
import ListHomeCard from "../components/home/ListHomeCard";
import TopContainer from "../components/home/TopContainer";
import { delay } from "../utils/delay";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const {
    topAiring,
    currentlyAiring,
    upcoming,
    popular,
    loading: animeLoading,
    error: animeError,
  } = useSelector((state: RootState) => state.anime);
  const {
    topManga,
    loading: mangaLoading,
    error: mangaError,
  } = useSelector((state: RootState) => state.manga);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTopAiring());
      await delay(400); // Add delay between requests
      await dispatch(fetchCurrentlyAiring(1));
      await delay(400); // Add delay between requests
      await dispatch(fetchUpcomingAnime(1));
      await delay(400); // Add delay between requests
      await dispatch(fetchPopularAnime(1));
      await delay(2000); // Add delay between requests
      await dispatch(fetchTopManga());
      setIsLoading(false); // Set loading to false when data is loaded
    };

    fetchData();
  }, [dispatch]);

  const loading = animeLoading || mangaLoading;
  const error = animeError || mangaError;

  if (isLoading) {
    return (
      <div className="bg-bg-color h-full w-full">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-40"
        >
          <p className="text-white">Loading...</p>
        </motion.div>
        {/* Menampilkan SkeletonCard saat loading */}
        <SkeletonCard type="currently" />
        <SkeletonCard type="upcoming" />
        <SkeletonCard type="popular" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bg-color h-screen w-full">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-40"
        >
          <p className="text-white text-2xl">
            {error} {/* Display dynamic error message from server */}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg-color h-full w-full">
      <Navbar />
      <HeaderCarousel animes={topAiring} />
      <ListHomeCard
        animes={currentlyAiring}
        type="currently"
        destination="/currentlyAiring"
      />
      <ListHomeCard animes={upcoming} type="upcoming" destination="/upcoming" />
      <ListHomeCard animes={popular} type="popular" destination="/popular" />
      <div className="flex flex-wrap lg:flex-row sm:flex-col w-full">
        <div className="w-full lg:w-1/2 sm:w-full p-2">
          <TopContainer title="Top 100 Anime" items={topAiring} type="anime" />
        </div>
        <div className="w-full lg:w-1/2 sm:w-full p-2">
          <TopContainer title="Top 100 Manga" items={topManga} type="manga" />
        </div>
      </div>
    </div>
  );
};

export default Home;
