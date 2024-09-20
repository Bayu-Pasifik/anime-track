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
import PaginationButton from "../components/PaginationButton";
import Footer from "../components/Footer";

const SeasonalAnime = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { seasonalAnime, error, seasons, pagination } = useSelector(
    (state: RootState) => state.anime
  );

  const [selectedSeason, setSelectedSeason] = useState(() => {
    const savedSeason = sessionStorage.getItem("selectedSeason");
    return savedSeason ? savedSeason : "winter";
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    const savedYear = sessionStorage.getItem("selectedYear");
    return savedYear ? Number(savedYear) : new Date().getFullYear();
  });
  const [viewMode, setViewMode] = useState("card");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [seasonFetched, setSeasonFetched] = useState(false);
  const [page, setPage] = useState(() => {
    const savedPage = sessionStorage.getItem("page");
    return savedPage ? Number(savedPage) : 1;
  });

  // Fetch seasons list only once
  useEffect(() => {
    if (!seasonFetched) {
      const fetchSeasons = async () => {
        try {
          await dispatch(fetchSeason()).unwrap();
          setSeasonFetched(true);
        } catch (error) {
          console.error("Error fetching seasons:", error);
        }
      };
      fetchSeasons();
    }
  }, [dispatch, seasonFetched]);

  // Fetch anime based on selected season, year, and page
  useEffect(() => {
    if (seasonFetched) {
      const fetchData = async () => {
        setIsFetchingMore(true);
        dispatch(clearSeasonalAnime());
        try {
          await dispatch(
            fetchSeasonalAnime({
              season: selectedSeason,
              year: selectedYear,
              page,
            })
          ).unwrap();
        } catch (error) {
          console.error("Error fetching seasonal anime:", error);
        } finally {
          setIsFetchingMore(false);
        }
      };
      fetchData();
    }
  }, [dispatch, selectedSeason, selectedYear, seasonFetched, page]);

  // Save data to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("selectedSeason", selectedSeason);
    sessionStorage.setItem("selectedYear", selectedYear.toString());
    sessionStorage.setItem("page", page.toString());
  }, [selectedSeason, selectedYear, page]);

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
    setPage(1); // Reset to page 1 when season changes
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setPage(1); // Reset to page 1 when year changes
  };

  const handleViewChange = (view: string) => {
    setViewMode(view);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
        {isFetchingMore ? (
          <div className="flex justify-center items-center mt-4">
            <NewDataLoading />
          </div>
        ) : (
          <>
            {error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : (
              <>
                <SeasonalResult data={seasonalAnime} viewMode={viewMode} />
                {pagination?.last_visible_page && (
                  <PaginationButton
                    currentPage={page}
                    totalPages={pagination.last_visible_page}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SeasonalAnime;
