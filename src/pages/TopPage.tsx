import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchTopAiring } from "../redux/animeSlice";
import { fetchTopManga } from "../redux/mangaSlice";
import Navbar from "../components/Navbar";
import Card from "../components/home/Card";
import PaginationButton from "../components/PaginationButton";
import LoadingAnimation from "../components/LoadingAnimations";
import ViewToggle from "../components/seasonal/ViewToggle";
import ListCard from "../components/ListCard";
import AnimatedWrapper from "../components/AnimatedWrapper";

interface TopPageProps {
  type: "anime" | "manga";
}

const TopPage: React.FC<TopPageProps> = ({ type }) => {
  const dispatch = useDispatch<AppDispatch>();

  // State to track the page number, resetting to 1 when type changes
  const [page, setPage] = useState<number>(() => {
    const savedPage = sessionStorage.getItem(
      type === "anime" ? "TopanimePage" : "TopmangaPage"
    );
    return savedPage ? Number(savedPage) : 1;
  });

  const { topAiring, loading, error, pagination } = useSelector(
    (state: RootState) => state.anime
  );
  const { topManga } = useSelector((state: RootState) => state.manga);
  const totalPages = pagination?.last_visible_page || 1;
  const [isFetching, setIsFetching] = useState(false);
  const [viewMode, setViewMode] = useState("card");

  // Effect to reset page to 1 when switching between anime and manga
  useEffect(() => {
    const resetPage = () => {
      const savedPage = sessionStorage.getItem(
        type === "anime" ? "TopanimePage" : "TopmangaPage"
      );
      setPage(savedPage ? Number(savedPage) : 1); // Reset page based on sessionStorage or default to 1
    };
    resetPage();
  }, [type]); // Reset the page when the type changes

  useEffect(() => {
    const fetchData = async () => {
      if (type === "anime") {
        setIsFetching(true);
        try {
          await dispatch(fetchTopAiring(page));
        } finally {
          setIsFetching(false);
        }
      } else {
        setIsFetching(true);
        try {
          await dispatch(fetchTopManga(page));
        } finally {
          setIsFetching(false);
        }
      }
    };

    fetchData();
  }, [dispatch, type, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Set new page number
    // Save the new page to sessionStorage based on type (anime or manga)
    sessionStorage.setItem(
      type === "anime" ? "TopanimePage" : "TopmangaPage",
      newPage.toString()
    );
  };

  const handleViewChange = (view: string) => {
    setViewMode(view);
  };

  return (
    <div className="bg-bg-color min-h-screen w-full">
      <Navbar />
      <div className="font-roboto p-4">
        <h1 className="text-center font-bold text-2xl text-white my-4 uppercase">
          {type === "anime" ? "Top Anime" : "Top Manga"}
        </h1>
        <div className="flex justify-end mb-4">
          <ViewToggle selectedView={viewMode} onViewChange={handleViewChange} />
        </div>

        {isFetching ? (
          // Centering the loading animation
          <div className="flex justify-center items-center h-full">
            <LoadingAnimation />
          </div>
        ) : (
          <>
            {/* Card View */}
            {viewMode === "card" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
                {type === "anime" &&
                  topAiring.map((anime, index) => (
                    <AnimatedWrapper
                      key={anime.mal_id}
                      index={index}
                      type="card"
                    >
                      <Card
                        title={anime.title}
                        imageUrl={anime.images.jpg.large_image_url}
                        synopsis={anime.synopsis}
                        type="anime"
                        mal_id={anime.mal_id}
                        key={index}
                      />
                    </AnimatedWrapper>
                  ))}
                {type === "manga" &&
                  topManga.map((manga, index) => (
                    <AnimatedWrapper
                      key={manga.mal_id}
                      index={index}
                      type="card"
                    >
                      <Card
                        title={manga.title}
                        imageUrl={manga.images.jpg.large_image_url}
                        synopsis={manga.synopsis}
                        type="manga"
                        mal_id={manga.mal_id}
                        key={index}
                      />
                    </AnimatedWrapper>
                  ))}
              </div>
            )}

            {/* List View */}
            {viewMode === "list" && (
              <div className="flex flex-col space-y-4 p-3">
                {type === "anime" &&
                  topAiring.map((anime, index) => (
                    <AnimatedWrapper
                      key={anime.mal_id}
                      index={index}
                      type="list"
                    >
                      <ListCard
                        genres={anime.genres.map((genre) => genre.name)}
                        synopsis={anime.synopsis}
                        imageUrl={anime.images.jpg.large_image_url}
                      />
                    </AnimatedWrapper>
                  ))}
                {type === "manga" &&
                  topManga.map((manga, index) => (
                    <AnimatedWrapper
                      key={manga.mal_id}
                      index={index}
                      type="list"
                    >
                      <ListCard
                        genres={manga.genres.map((genre) => genre.name)}
                        synopsis={manga.synopsis}
                        imageUrl={manga.images.jpg.large_image_url}
                      />
                    </AnimatedWrapper>
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination Component */}
      {!loading && (
        <PaginationButton
          currentPage={page}
          totalPages={totalPages} // Adjust this if manga has pagination info as well
          onPageChange={handlePageChange}
        />
      )}

      {error && <p className="text-center text-red-500">Error: {error}</p>}
    </div>
  );
};

export default TopPage;
