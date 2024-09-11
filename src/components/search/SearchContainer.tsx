import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchSearchResults } from "../../redux/animeSlice";
import Card from "../../components/home/Card";
import LoadingAnimation from "../../components/LoadingAnimations";
import NewDataLoading from "../../components/NewDataLoading";
import { delay } from "../../utils/delay";

const SearchContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error } = useSelector(
    (state: RootState) => state.anime
  );

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [type, setType] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [hasMore, setHasMore] = useState(true); // Local state for hasMore
  const [initialLoading, setInitialLoading] = useState(false); // Control for initial loading state

  // Handle search button
  const handleSearch = async () => {
    if (initialLoading) return; // Prevent multiple clicks while loading
    setPage(1); // Reset pagination
    setHasMore(true); // Reset hasMore on new search
    setInitialLoading(true); // Start initial loading
    try {
      await dispatch(
        fetchSearchResults({ query, selectedGenres, type, statusFilter, page: 1 })
      );
    } finally {
      setInitialLoading(false); // Set to false when fetching is complete
    }
  };

  // Handle infinite scroll and fetching more data
  useEffect(() => {
    const fetchMoreResults = async () => {
      if (loading || !hasMore || page === 1) return; // Don't fetch if loading or no more data
      await delay(500); // Optional delay
      const resultAction = await dispatch(
        fetchSearchResults({ query, selectedGenres, type, statusFilter, page })
      ).unwrap();

      if (resultAction.pagination.has_next_page === false) {
        setHasMore(false); // If no more data, set hasMore to false
      } else {
        setHasMore(true); // If more data, set hasMore to true
      }
    };

    fetchMoreResults();
  }, [
    dispatch,
    page,
    query,
    selectedGenres,
    type,
    statusFilter,
    hasMore,
    loading,
  ]);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handle scroll event for infinite scroll
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, handleScroll]);

  return (
    <div className="min-h-screen w-full">
      <div className="font-roboto font-bold text-2xl text-white p-3 my-4">
        Search Results
      </div>

      {/* Search Input Section */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search Anime"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded w-full"
        />
        {/* Additional filters for genres, type, and status can go here */}
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          disabled={initialLoading} // Disable button while initial loading
        >
          {initialLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Display Loading Animation During Initial Search */}
      {initialLoading && (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      )}

      {/* Display Search Results */}
      {!initialLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 p-3">
          {searchResults.length > 0 &&
            searchResults.map((anime, index) => (
              <Card key={index} anime={anime} type="anime" />
            ))}
        </div>
      )}

      {/* Loading, Error, and No More Data */}
      {loading && <NewDataLoading />}
      {error && (
        <div className="text-red-500 text-center">
          Error fetching results: {error}
        </div>
      )}
      {!loading && hasMore === false && (
        <div className="text-white text-center">No more data to load</div>
      )}
    </div>
  );
};

export default SearchContainer;
