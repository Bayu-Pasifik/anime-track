import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Card from "../components/home/Card";
import { AppDispatch, RootState } from "../redux/store";
import LoadingAnimation from "../components/LoadingAnimations";
import Navbar from "../components/Navbar";
import { fetchCurrentlyAiring } from "../redux/animeSlice";
import { delay } from "../utils/delay";

// Fungsi debounce untuk handle scroll
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ViewMore: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const { currentlyAiring, loading: animeLoading } = useSelector(
    (state: RootState) => state.anime
  );
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Tambahkan state untuk pengecekan loading pertama kali

  useEffect(() => {
    if (initialLoading) {
      dispatch(fetchCurrentlyAiring(page))
        .unwrap()
        .then((data) => {
          if (!data.pagination.has_next_page) {
            setHasMore(false);
          }
          setInitialLoading(false); // Setelah data pertama dimuat, ubah initialLoading menjadi false
        })
        .catch(() => {
          setHasMore(false);
          setInitialLoading(false); // Ubah initialLoading menjadi false jika terjadi error
        });
    }
  }, [dispatch, page, initialLoading]);

  useEffect(() => {
    if (!initialLoading && hasMore && page > 1) {
      delay(1000);
      dispatch(fetchCurrentlyAiring(page))
        .unwrap()
        .then((data) => {
          if (!data.pagination.has_next_page) {
            setHasMore(false);
          }
        })
        .catch(() => setHasMore(false));
    }
  }, [dispatch, page, hasMore, initialLoading]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !animeLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [animeLoading, hasMore, handleScroll]);

  if (initialLoading) {
    return <LoadingAnimation />; // Tampilkan LoadingAnimation saat pertama kali loading
  }

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar />
      <div className="font-roboto font-bold text-2xl text-white p-3 my-4">
        Currently Airing
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
        {currentlyAiring &&
          currentlyAiring.map((anime, index) => (
            <motion.div
              key={`${anime.mal_id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Card anime={anime} />
            </motion.div>
          ))}
      </div>
      {animeLoading && !initialLoading && (
        <div className="flex items-center justify-center p-3">
          <div className="w-6 h-6 border-8 border-red-500 rounded-full animate-spin"></div>
          <span className="text-white ml-2">Loading more data...</span>
        </div>
      )}
      {!hasMore && (
        <div className="text-center text-white p-3">No more data to load</div>
      )}
    </div>
  );
};

export default ViewMore;
