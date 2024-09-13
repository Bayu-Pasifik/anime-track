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

const SeasonalAnime = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { seasonalAnime, loading, error, seasons } = useSelector(
    (state: RootState) => state.anime
  );
  const [selectedSeason, setSelectedSeason] = useState("winter");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("card");

  useEffect(() => {
    dispatch(clearSeasonalAnime());
    dispatch(
      fetchSeasonalAnime({ season: selectedSeason, year: selectedYear })
    );
  }, [dispatch, selectedSeason, selectedYear]);

  useEffect(() => {
    dispatch(fetchSeason());
  }, [dispatch]);

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handleViewChange = (view: string) => {
    setViewMode(view);
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

        {loading ? (
          <div className="flex justify-center items-center mt-72">
            <NewDataLoading />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <SeasonalResult data={seasonalAnime} viewMode={viewMode} />
        )}
      </div>
    </div>
  );
};

export default SeasonalAnime;
