import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card from "../components/home/Card";
import { AppDispatch, RootState } from "../redux/store";
import LoadingAnimation from "../components/LoadingAnimations";
import Navbar from "../components/Navbar";
import {
  fetchCurrentlyAiring,
  fetchUpcomingAnime,
  fetchPopularAnime,
} from "../redux/animeSlice";
import { delay } from "../utils/delay";
import NewDataLoading from "../components/NewDataLoading";
import { debounce } from "../utils/debounce";

interface ViewMoreProps {
  type: "currentlyAiring" | "upcoming" | "popular";
}

const ViewMore: React.FC<ViewMoreProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    currentlyAiring,
    upcoming,
    popular,
    loading: animeLoading,
    pagination,
  } = useSelector((state: RootState) => state.anime);

  const animeList =
    type === "currentlyAiring"
      ? currentlyAiring
      : type === "upcoming"
      ? upcoming
      : popular;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "currentlyAiring") {
          await dispatch(fetchCurrentlyAiring(page)).unwrap();
        } else if (type === "upcoming") {
          await dispatch(fetchUpcomingAnime(page)).unwrap();
        } else if (type === "popular") {
          await dispatch(fetchPopularAnime(page)).unwrap();
        }
        setHasMore(pagination.has_next_page); // Perbarui hasMore sesuai pagination
      } catch (error) {
        setHasMore(false);
      } finally {
        setInitialLoading(false);
      }
    };

    if (initialLoading) {
      fetchData();
    }
  }, [dispatch, type, page, initialLoading, pagination]);

  useEffect(() => {
    if (!initialLoading && hasMore && page > 1) {
      delay(1000);
      const fetchMoreData = async () => {
        if (type === "currentlyAiring") {
          await dispatch(fetchCurrentlyAiring(page)).unwrap();
        } else if (type === "upcoming") {
          await dispatch(fetchUpcomingAnime(page)).unwrap();
        } else if (type === "popular") {
          await dispatch(fetchPopularAnime(page)).unwrap();
        }

        setHasMore(pagination.has_next_page); // Perbarui hasMore sesuai pagination
      };
      fetchMoreData();
    }
  }, [dispatch, page, hasMore, initialLoading, type, pagination]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !animeLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animeLoading, hasMore, handleScroll]);

  if (initialLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar />
      <div className="font-roboto font-bold text-2xl text-white p-3 my-4">
        {type === "currentlyAiring" && "Currently Airing"}
        {type === "upcoming" && "Upcoming Anime"}
        {type === "popular" && "Popular Anime"}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
        {animeList &&
          animeList.map((anime, index) => (
            <motion.div
              key={`${anime.mal_id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Card anime={anime} type="anime" />
            </motion.div>
          ))}
      </div>
      {animeLoading || (!initialLoading && hasMore && <NewDataLoading />)}
      {!hasMore && (
        <div className="text-center text-white p-3">No more data to load</div>
      )}
    </div>
  );
};

export default ViewMore;
