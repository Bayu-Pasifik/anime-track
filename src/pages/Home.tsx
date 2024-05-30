import React, { useEffect, useState } from "react";
import { Anime } from "../config/data";
import axios from "../config/axiosConfig";
import HeaderCarousel from "../components/carousel/Carousel";
import Card from "../components/Card";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  const [topAiring, setTopAiring] = useState<Anime[]>([]);
  const [currentlyAiring, setCurrentlyAiring] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopAiring = async () => {
      try {
        const response = await axios.get("/top/anime");
        setTopAiring(response.data.data);
      } catch (error) {
        console.error("Error fetching top anime", error);
      }
    };

    fetchTopAiring();
  }, []);

  useEffect(() => {
    const fetchCurrentlyAiring = async (page: number) => {
      setLoading(true);
      try {
        const cachedData = localStorage.getItem(`currentlyAiringPage${page}`);
        if (cachedData) {
          setCurrentlyAiring((prev) => [...prev, ...JSON.parse(cachedData)]);
        } else {
          const response = await axios.get("/anime", {
            params: { status: "airing", sfw: true, page: page },
          });
          setCurrentlyAiring((prev) => [...prev, ...response.data.data]);
          localStorage.setItem(
            `currentlyAiringPage${page}`,
            JSON.stringify(response.data.data)
          );
          setHasMore(response.data.pagination.has_next_page);
        }
      } catch (error) {
        console.error("Error fetching currently airing anime", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentlyAiring(currentPage);
  }, [currentPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      hasMore &&
      !loading
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [hasMore, loading]);

  const debounce = (func: () => void, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func();
      }, wait);
    };
  };

  return (
    <div className="bg-bg-color h-full w-full">
      <Navbar></Navbar>
      <HeaderCarousel animes={topAiring} />
      <div>
        <h1 className="text-white text-2xl font-bold mb-4 mt-4">
          Currently Airing
        </h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card animes={currentlyAiring} />
      </motion.div>
      {loading && (
        <div className="flex justify-center mt-4">
          <p className="text-white">Loading...</p>
        </div>
      )}
      {!hasMore && (
        <div className="flex justify-center mt-4">
          <p className="text-white">No more data to load</p>
        </div>
      )}
    </div>
  );
};

export default Home;
