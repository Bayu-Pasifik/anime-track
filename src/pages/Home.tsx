import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAnimeData } from "../redux/animeSlice";
import { fetchTopManga } from "../redux/mangaSlice";
import HeaderCarousel from "../components/carousel/Carousel";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";
import ListHomeCard from "../components/home/ListHomeCard";
import TopContainer from "../components/home/TopContainer";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    dispatch(fetchAnimeData());
    dispatch(fetchTopManga());
  }, [dispatch]);

  const loading = animeLoading || mangaLoading;
  const error = animeError || mangaError;

  if (loading) {
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
        <SkeletonCard type="currently" />
        <SkeletonCard type="upcoming" />
        <SkeletonCard type="popular" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bg-color h-full w-full">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center h-40"
        >
          <p className="text-white">
            Something Went Wrong, please refresh the website.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-bg-color h-full w-full">
      <Navbar />
      <HeaderCarousel animes={topAiring} />
      <ListHomeCard animes={currentlyAiring} type="currently" />
      <ListHomeCard animes={upcoming} type="upcoming" />
      <ListHomeCard animes={popular} type="popular" />
      <div className="flex flex-wrap lg:flex-row sm:flex-col w-full">
        <div className="lg:w-1/2 sm:w-full p-4">
          <TopContainer title="Top 100 Anime" items={topAiring} type="anime" />
        </div>
        <div className="lg:w-1/2 sm:w-full p-4">
          <TopContainer title="Top 100 Manga" items={topManga}  type="manga"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
