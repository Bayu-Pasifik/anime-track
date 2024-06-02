// src/pages/Home.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAnimeData } from "../redux/animeSlice";
import HeaderCarousel from "../components/carousel/Carousel";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";
import ListHomeCard from "../components/home/ListHomeCard";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { topAiring, currentlyAiring, upcoming, popular, loading, error } =
    useSelector((state: RootState) => state.anime);

  useEffect(() => {
    dispatch(fetchAnimeData());
  }, [dispatch]);

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
    </div>
  );
};

export default Home;
