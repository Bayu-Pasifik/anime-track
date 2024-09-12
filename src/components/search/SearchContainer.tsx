import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchSearchResults,
  fetchGenre,
  clearSearchResults,
} from "../../redux/animeSlice"; // Import fetchGenre
import Card from "../../components/home/Card";
import LoadingAnimation from "../../components/LoadingAnimations";
import NewDataLoading from "../../components/NewDataLoading";
import { delay } from "../../utils/delay";
import GenreChips from "../search/GenreChips"; // Import GenreChips
import DropdownFilter from "../search/DropDownFilter"; // Import DropdownFilter
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";

const SearchContainer: React.FC<{ contentType: string }> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error, pagination } = useSelector(
    (state: RootState) => state.anime
  );

  // Local state for page, query, selected genres, and filters
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [type, setType] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);
  const [genres, setGenres] = useState<{ mal_id: number; name: string }[]>([]); // Store genres

  // Fetch genres when the component mounts
  useEffect(() => {
    const loadGenres = async () => {
      const result = await dispatch(fetchGenre()).unwrap();
      setGenres(result);
    };
    loadGenres();
  }, [dispatch]);

  // Handle search button
  const handleSearch = async () => {
    if (initialLoading) return;
    setHasMore(true);
    setInitialLoading(true);
    try {
      dispatch(clearSearchResults());
      await dispatch(
        fetchSearchResults({
          query,
          selectedGenres,
          type,
          statusFilter,
          page: 1,
        })
      );
    } catch (error) {
      console.error("Error fetching search results:", error);
      setHasMore(false);
    } finally {
      setInitialLoading(false);
    }
  };

  // Handle genre toggle
  const handleGenreToggle = (id: number) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(id)
        ? prevSelectedGenres.filter((genreId) => genreId !== id)
        : [...prevSelectedGenres, id]
    );
  };

  // Handle infinite scroll and fetching more data
  useEffect(() => {
    const fetchMoreResults = async () => {
      if (loading || !hasMore || page === 1) return;
      if (!initialLoading && hasMore && page > 1) {
        await delay(500);
        await dispatch(
          fetchSearchResults({
            query,
            selectedGenres,
            type,
            statusFilter,
            page,
          })
        ).unwrap();
        setHasMore(pagination.has_next_page);
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

  // Handle scroll event for infinite scroll
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, handleScroll]);

  // Options for type and status dropdowns
  const typeOptions = [
    { value: "", label: "All Types" },
    { value: "tv", label: "TV" },
    { value: "movie", label: "Movie" },
    { value: "ova", label: "OVA" },
    { value: "special", label: "Special" },
    { value: "ona", label: "ONA" },
    { value: "music", label: "Music" },
    { value: "cm", label: "Short Advertisement" },
    { value: "pv", label: "PV" },
    { value: "tv_special", label: "TV Special" },
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "airing", label: "Airing" },
    { value: "complete", label: "Completed" },
    { value: "upcoming", label: "Upcoming" },
  ];

  return (
    <div className="min-h-screen w-full p-3">
      {/* Search Input Section */}
      <div className="flex flex-col space-y-3">
        {/* Row for Search Input and Dropdowns */}
        <div className="flex flex-col gap-4  md:flex-row md:items-center md:space-x-4">
          <SearchInput query={query} setQuery={setQuery} />

          <DropdownFilter
            label="Type"
            options={typeOptions}
            selectedValue={type}
            setSelectedValue={setType}
          />

          <DropdownFilter
            label="Status"
            options={statusOptions}
            selectedValue={statusFilter}
            setSelectedValue={setStatusFilter}
          />
        </div>

        {/* Genre Chips */}
        <GenreChips
          genres={genres}
          selectedGenres={selectedGenres}
          handleGenreToggle={handleGenreToggle}
        />

        {/* Search Button */}
        <SearchButton onClick={handleSearch} isSearching={initialLoading} />
      </div>

      {/* Display Loading Animation During Initial Search */}
      {initialLoading && (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      )}

      {/* Search Results */}
      <div className="font-roboto font-bold text-2xl text-white p-3 my-4">
        Search Results
      </div>
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
