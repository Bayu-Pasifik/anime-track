import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchSearchResults,
  fetchGenre,
  clearSearchResults,
} from "../../redux/animeSlice";
import {
  fetchMangaSearchResults,
  fetchMangaGenres,
  clearMangaSearchResults,
} from "../../redux/mangaSlice";
import Card from "../../components/home/Card";
import LoadingAnimation from "../../components/LoadingAnimations";
import NewDataLoading from "../../components/NewDataLoading";
import { delay } from "../../utils/delay";
import GenreChips from "../search/GenreChips";
import DropdownFilter from "../search/DropDownFilter";
import SearchInput from "./SearchInput";
import SearchButton from "./SearchButton";
import { debounce } from "../../utils/debounce";

interface SearchContainerProps {
  contentType: "anime" | "manga";
}

const SearchContainer: React.FC<SearchContainerProps> = ({ contentType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading, error, pagination } = useSelector(
    (state: RootState) => (contentType === "anime" ? state.anime : state.manga)
  );

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [type, setType] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(false);
  const [genres, setGenres] = useState<{ mal_id: number; name: string }[]>([]);

  // Fetch genres when the component mounts
  useEffect(() => {
    const loadGenres = async () => {
      if (contentType === "anime") {
        const result = await dispatch(fetchGenre()).unwrap();
        setGenres(result);
      } else {
        const result = await dispatch(fetchMangaGenres()).unwrap();
        setGenres(result);
      }
    };
    loadGenres();
  }, [dispatch, contentType]);

  // Handle search button
  const handleSearch = async () => {
    if (initialLoading) return;
    setHasMore(true);
    setInitialLoading(true);
    setPage(1);
    try {
      dispatch(clearSearchResults());
      if (contentType === "anime") {
        await dispatch(
          fetchSearchResults({
            query,
            selectedGenres,
            type,
            statusFilter,
            page: 1,
          })
        );
      } else {
        dispatch(clearMangaSearchResults());
        await dispatch(
          fetchMangaSearchResults({
            query,
            selectedGenres,
            type,
            statusFilter,
            page: 1,
          })
        );
      }
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

  // Fetch more results only when page changes due to scrolling
  const fetchMoreResults = async () => {
    if (loading || !hasMore || page === 1) return;

    try {
      await delay(500);
      if (contentType === "anime") {
        await dispatch(
          fetchSearchResults({
            query,
            selectedGenres,
            type,
            statusFilter,
            page,
          })
        ).unwrap();
      } else {
        await dispatch(
          fetchMangaSearchResults({
            query,
            selectedGenres,
            type,
            statusFilter,
            page,
          })
        ).unwrap();
      }
    } catch (error) {
      console.error("Error fetching more results:", error);
    }
    setHasMore(pagination.has_next_page);
  };

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1); // Increase page number when scrolled to the bottom
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, handleScroll]);

  // Fetch more results when page changes
  useEffect(() => {
    fetchMoreResults();
  }, [page]);

  return (
    <div className="min-h-screen w-full p-3">
      {/* Search Input Section */}
      <div className="flex flex-col space-y-3">
        {/* Row for Search Input and Dropdowns */}
        <div className="flex flex-col gap-4  md:flex-row md:items-center md:space-x-4">
          <SearchInput query={query} setQuery={setQuery} />

          {/* Dropdowns */}
          {type === "anime" ? (
            <DropdownFilter
            label="Type"
            options={[
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
            ]}
            selectedValue={type}
            setSelectedValue={setType}
          />
          ) : <DropdownFilter
          label="Type"
          options={[
            { value: "", label: "All Types" },
            { value: "manga", label: "Manga" },
            { value: "novel", label: "Novel" },
            { value: "lightnovel", label: "Light Novel" },
            { value: "oneshot", label: "Oneshot" },
            { value: "doujin", label: "Doujin" },
            { value: "manhwa", label: "Manhwa" },
            { value: "manhua", label: "Manhua" },

          ]}
          selectedValue={type}
          setSelectedValue={setType}
        />}

          {type === "anime" ? (
            <DropdownFilter
            label="Status"
            options={[
              { value: "", label: "All Statuses" },
              { value: "airing", label: "Airing" },
              { value: "complete", label: "Completed" },
              { value: "upcoming", label: "Upcoming" },
            ]}
            selectedValue={statusFilter}
            setSelectedValue={setStatusFilter}
          />
          ) :<DropdownFilter
          label="Status"
          options={[
            { value: "", label: "All Statuses" },
            { value: "publishing", label: "Publishing" },
            { value: "complete", label: "Completed" },
            { value: "upcoming", label: "Upcoming" },
            { value: "discontinued", label: "Discontinued" },
          ]}
          selectedValue={statusFilter}
          setSelectedValue={setStatusFilter}
        />}
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
            searchResults.map((item, index) => (
              <Card key={index} item={item} type={contentType} />
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
