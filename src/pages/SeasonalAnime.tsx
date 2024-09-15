import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeason,
  fetchSeasonalAnime,
  clearSeasonalAnime,
} from "../redux/animeSlice";
import DropdownYear from "../components/seasonal/DropdownYear";
import { AppDispatch, RootState } from "../redux/store";
import SeasonalResult from "../components/seasonal/SeasonalResult";
import Navbar from "../components/Navbar";
import SeasonToggle from "../components/seasonal/SeasonToggle";
import ViewToggle from "../components/seasonal/ViewToggle";
import NewDataLoading from "../components/NewDataLoading";
import { delay } from "../utils/delay";
import { debounce } from "../utils/debounce";

const SeasonalAnime = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { seasonalAnime, loading, error, seasons, pagination } = useSelector(
    (state: RootState) => state.anime
  );
  const [selectedSeason, setSelectedSeason] = useState("winter");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("card");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [seasonFetched, setSeasonFetched] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch seasons list only once
  useEffect(() => {
    const fetchSeasons = async () => {
      if (!seasonFetched) {
        await delay(1500);
        dispatch(fetchSeason())
          .unwrap()
          .then(() => setSeasonFetched(true))
          .catch((error) => console.error("Error fetching seasons:", error));
      }
    };
    fetchSeasons();
  }, [dispatch, seasonFetched]);

  // Fetch anime based on selected season and year
  useEffect(() => {
    const fetchData = async () => {
      if (seasonFetched) {
        dispatch(clearSeasonalAnime());
        await delay(2000);
        dispatch(
          fetchSeasonalAnime({ season: selectedSeason, year: selectedYear })
        )
          .unwrap()
          .catch((error) =>
            console.error("Error fetching seasonal anime:", error)
          );
      }
    };
    fetchData();
  }, [dispatch, selectedSeason, selectedYear, seasonFetched]);

  // Function to fetch more pages when needed
  const loadMoreAnime = async () => {
    if (!isFetchingMore && pagination?.has_next_page) {
      setIsFetchingMore(true);
      await delay(1000);
      dispatch(
        fetchSeasonalAnime({
          season: selectedSeason,
          year: selectedYear,
          page: pagination.current_page + 1,
        })
      )
        .unwrap()
        .then((result) => {
          if (!result.pagination.has_next_page) {
            setHasMore(false);
          }
        })
        .finally(() => setIsFetchingMore(false));
    }
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleViewChange = (view: string) => {
    setViewMode(view);
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      hasMore &&
      !loading &&
      !isFetchingMore
    ) {
      setPage((prevPage) => prevPage + 1); // Increase page number when scrolled to the bottom
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, isFetchingMore]);

  // Fetch more results when page changes
  useEffect(() => {
    loadMoreAnime();
  }, [page]);

  return (
    <div className="bg-bg-color min-h-screen">
      <Navbar />
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center my-6">
          <ViewToggle selectedView={viewMode} onViewChange={handleViewChange} />
          <div className="flex flex-col md:flex-row md:space-x-12 items-center space-y-5 md:space-y-0 mt-4 md:mt-0">
            <DropdownYear
              years={seasons.map((season) => season.year)}
              selectedYear={selectedYear}
              onSelectYear={handleYearChange}
            />
            <SeasonToggle
              selectedSeason={selectedSeason}
              onSeasonChange={handleSeasonChange}
            />
          </div>
        </div>

        {loading && !isFetchingMore ? (
          <div className="flex justify-center items-center mt-72">
            <NewDataLoading />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <>
            <SeasonalResult data={seasonalAnime} viewMode={viewMode} />
            {isFetchingMore && (
              <div className="flex justify-center items-center mt-4">
                <NewDataLoading />
              </div>
            )}
            {!loading &&hasMore === false && (
              <div className="flex justify-center items-center mt-4">
                <p className="text-center text-xl text-white">No more results</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SeasonalAnime;
