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
import NewDataLoading from "../components/NewDataLoading";
import PaginationButton from "../components/PaginationButton";
import Footer from "../components/Footer";

interface ViewMoreProps {
  type: "currentlyAiring" | "upcoming" | "popular";
}

const ViewMore: React.FC<ViewMoreProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(() => {
    // Ambil halaman terakhir dari sessionStorage, atau default ke 1
    return Number(sessionStorage.getItem(`${type}-page`)) || 1;
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
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

  // Fetch data based on page and type
  const fetchData = async () => {
    setIsFetching(true);
    try {
      if (type === "currentlyAiring") {
        await dispatch(fetchCurrentlyAiring(page)).unwrap();
      } else if (type === "upcoming") {
        await dispatch(fetchUpcomingAnime(page)).unwrap();
      } else if (type === "popular") {
        await dispatch(fetchPopularAnime(page)).unwrap();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setInitialLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    // Simpan halaman saat ini di sessionStorage setiap kali page berubah
    sessionStorage.setItem(`${type}-page`, page.toString());
  }, [page, type]);

  const handlePageChange = (newPage: number) => {
    if (!isFetching) {
      setPage(newPage);
    }
  };

  if (initialLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="bg-bg-color min-h-screen w-full">
      <Navbar />
      <div className="font-roboto font-bold text-2xl text-white p-3 my-4 uppercase">
        All {type === "currentlyAiring" && "Currently Airing"}
        {type === "upcoming" && "Upcoming Anime"}
        {type === "popular" && "Popular Anime"}
      </div>
      {isFetching === true ? (
        <LoadingAnimation />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
          {animeList &&
            animeList.map((anime, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  imageUrl={anime.images.jpg.large_image_url}
                  mal_id={anime.mal_id}
                  synopsis={anime.synopsis}
                  title={anime.title}
                  type="anime"
                  key={index}
                />
              </motion.div>
            ))}
        </div>
      )}
      {animeLoading || isFetching ? (
        <NewDataLoading />
      ) : (
        <PaginationButton
          currentPage={page}
          totalPages={pagination?.last_visible_page || 1}
          onPageChange={handlePageChange}
        />
      )}
      <Footer />
    </div>
  );
};

export default ViewMore;
