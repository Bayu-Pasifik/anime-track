import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchCurrentlyAiring,
  fetchPopularAnime,
  fetchTopAiring,
  fetchUpcomingAnime,
} from "../redux/animeSlice";
import { fetchTopManga } from "../redux/mangaSlice";
import { delay } from "../utils/delay";
import Navbar from "../components/Navbar";
import SkeletonCard from "../components/SkeletonCard";
import HeaderCarousel from "../components/carousel/Carousel";
import ListHomeCard from "../components/home/ListHomeCard";
import TopContainer from "../components/home/TopContainer";
import LoaderWithProgress from "../components/home/LoaderWithProgress"; // Animated Loader

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0); // Progress state
  const {
    topAiring,
    currentlyAiring,
    upcoming,
    popular,
    error: animeError,
  } = useSelector((state: RootState) => state.anime);
  const { topManga, error: mangaError } = useSelector((state: RootState) => state.manga);
  const error = animeError || mangaError;

  useEffect(() => {
    const abortController = new AbortController(); // Create an AbortController instance

    const fetchData = async () => {
      try {
        // Fetch data and update progress incrementally
        await dispatch(fetchTopAiring(1)).unwrap();
        setProgress(20); // Update progress to 20%
        await delay(1000);

        await dispatch(fetchCurrentlyAiring(1)).unwrap();
        setProgress(40); // Update progress to 40%
        await delay(1000);

        await dispatch(fetchUpcomingAnime(1)).unwrap();
        setProgress(60); // Update progress to 60%
        await delay(1000);

        await dispatch(fetchPopularAnime(1)).unwrap();
        setProgress(80); // Update progress to 80%
        await delay(1000);

        await dispatch(fetchTopManga(1)).unwrap();
        setProgress(100); // Update progress to 100%
        setIsLoading(false); // Set loading to false after all data is fetched
      } catch (err) {
        if (abortController.signal.aborted) {
          console.log("Fetch aborted");
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Abort fetch when component unmounts
    };
  }, [dispatch]);

  // Hide Navbar and show animated loader while loading
  if (isLoading) {
    return (
      <div className="bg-bg-color h-full w-full">
        {/* Hide Navbar while loading */}
        <LoaderWithProgress progress={progress} />
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
        <div className="flex justify-center items-center h-40">
          <p className="text-white text-2xl">{error}</p>
        </div>
      </div>
    );
  }

  // Show Navbar after data is fully loaded
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
