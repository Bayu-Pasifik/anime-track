import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchGenre, fetchSearchResults } from "../../redux/animeSlice";
import SearchInput from "./SearchInput";
import GenreChips from "./GenreChips";
import DropdownFilter from "./DropDownFilter";
import SearchButton from "./SearchButton";
import SearchResults from "./SearchResult";
import NewDataLoading from "../NewDataLoading";

interface SearchContainerProps {
  contentType: "anime" | "manga";
}

const SearchContainer: React.FC<SearchContainerProps> = ({ contentType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const genres = useSelector((state: RootState) => state.anime.genres);
  const searchResults = useSelector(
    (state: RootState) => state.anime.searchResults
  );
  const status = useSelector((state: RootState) => state.anime.status);
  const hasMore = useSelector((state: RootState) => state.anime.hasMore);

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [query, setQuery] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchGenre());
  }, [dispatch]);

  useEffect(() => {
    if (page === 1) {
      dispatch(fetchSearchResults({ query, selectedGenres, type, statusFilter, page: 1 }));
    }
  }, [dispatch, query, selectedGenres, type, statusFilter, page]);

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genreId)
        ? prevSelectedGenres.filter((id) => id !== genreId)
        : [...prevSelectedGenres, genreId]
    );
  };

  const handleSearch = () => {
    setPage(1);
    dispatch(fetchSearchResults({ query, selectedGenres, type, statusFilter, page: 1 }));
  };

  const loadMore = () => {
    if (hasMore && status !== "loading") {
      const nextPage = page + 1;
      setPage(nextPage);
      dispatch(fetchSearchResults({ query, selectedGenres, type, statusFilter, page: nextPage }));
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="max-w-full mx-auto p-6 bg-bg-color h-full">
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">
        Search {contentType === "anime" ? "Anime" : "Manga"}
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchInput query={query} setQuery={setQuery} />
        <DropdownFilter
          label="All Types"
          options={[
            { value: "tv", label: "TV" },
            { value: "movie", label: "Movie" },
            ...(contentType === "manga"
              ? [{ value: "manga", label: "Manga" }]
              : []),
          ]}
          selectedValue={type}
          setSelectedValue={setType}
        />
        <DropdownFilter
          label="All Statuses"
          options={[
            { value: "airing", label: "Airing" },
            { value: "complete", label: "Complete" },
            { value: "upcoming", label: "Upcoming" },
          ]}
          selectedValue={statusFilter}
          setSelectedValue={setStatusFilter}
        />
      </div>

      <GenreChips
        genres={genres}
        selectedGenres={selectedGenres}
        handleGenreToggle={handleGenreToggle}
      />
      <SearchButton onClick={handleSearch} />

      {status === "loading" && page === 1 && (
        <NewDataLoading />
      )}
      {status === "succeeded" && (
        <>
          <SearchResults
            searchResults={searchResults}
            contentType={contentType}
          />
        </>
      )}
      {status === "failed" && (
        <div className="mt-6 text-center text-red-500">
          Failed to fetch results.
        </div>
      )}
    </div>
  );
};

export default SearchContainer;
